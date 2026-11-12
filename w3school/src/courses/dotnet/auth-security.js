// .NET chapter: Authentication and Authorization.

export default {
  id: 'auth-security',
  title: 'Auth & Security',
  description: 'Authentication, JWT tokens, policies and secrets',
  icon: 'lock',
  lessons: [
    {
      id: 'dn-authn-authz',
      title: 'Authentication versus authorization',
      blocks: [
        { type: 'text', value: 'Authentication answers who the caller is. Authorization answers what that caller may do. ASP.NET Core checks both in the middleware pipeline, so the order of UseAuthentication and UseAuthorization matters.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/courses", () => Results.Ok())
   .RequireAuthorization();

app.MapDelete("/api/courses/{id:int}", () => Results.NoContent())
   .RequireAuthorization("AdminOnly");` },
        { type: 'note', value: '401 Unauthorized means the caller is not logged in. 403 Forbidden means the caller is logged in but not allowed.' },
      ],
    },
    {
      id: 'dn-jwt',
      title: 'JWT bearer tokens',
      blocks: [
        { type: 'text', value: 'A JSON Web Token carries signed claims about the user. The client sends it in the Authorization header. The server verifies the signature and expiry on each request, without a session store.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });` },
        { type: 'list', items: [
          'Keep token lifetime short and use refresh tokens for long sessions',
          'Store the signing key in a secret store, never in git',
          'Validate issuer, audience and lifetime',
        ] },
      ],
    },
    {
      id: 'dn-policies-secrets',
      title: 'Policies and secrets',
      blocks: [
        { type: 'text', value: 'A policy groups rules such as a required role or claim. Keep secrets out of source control: use user secrets in development and a secret manager or environment variables in production.' },
        { type: 'code', lang: 'csharp', tryIt: false, value: `builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

// Development only: dotnet user-secrets set "Jwt:Key" "a-long-random-value"` },
        { type: 'note', value: 'Hashing passwords is not optional. Use ASP.NET Core Identity or a password hasher, never store a plain password or a fast hash such as MD5.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'auth-security',
      q: 'What does authorization decide?',
      options: ['Who the caller is', 'What an authenticated caller may do', 'The database schema', 'The colour of the response'],
      answer: 1,
      explain: 'Authentication identifies; authorization permits.',
    },
    {
      chapterId: 'auth-security',
      q: 'Which status code means logged in but not allowed?',
      options: ['401', '403', '404', '201'],
      answer: 1,
      explain: '403 Forbidden is for insufficient permission.',
    },
    {
      chapterId: 'auth-security',
      q: 'Why should a JWT signing key not be committed to git?',
      options: ['It is too long', 'Anyone with it can forge valid tokens', 'Git cannot store text', 'It slows the app'],
      answer: 1,
      explain: 'A leaked key lets an attacker sign their own tokens.',
    },
    {
      chapterId: 'auth-security',
      q: 'Which storage is right for passwords?',
      options: ['Plain text in a column', 'A slow, salted password hash', 'A base64 string', 'A query string'],
      answer: 1,
      explain: 'Use a proper password hasher with a salt.',
    },
  ],
};
