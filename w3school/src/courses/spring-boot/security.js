// Spring Boot chapter: Security.

export default {
  id: 'security',
  title: 'Security',
  description: 'Spring Security, password hashing and role-based access',
  icon: 'lock',
  lessons: [
    {
      id: 'sb-security-chain',
      title: 'Securing endpoints',
      blocks: [
        { type: 'text', value: 'Spring Security protects every endpoint once you add the starter. You describe the rules in a SecurityFilterChain bean: which paths are public, which need a login, and which need a role. Deny by default and open only what must be public.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults());
    return http.build();
}` },
        { type: 'note', value: 'Order matters: the first matching rule wins. Put the most specific rules first and anyRequest last.' },
      ],
    },
    {
      id: 'sb-passwords',
      title: 'Passwords and users',
      blocks: [
        { type: 'text', value: 'Never store plain passwords. Use a password encoder such as BCrypt, which adds a salt and is slow on purpose, so brute force is expensive. Spring Security checks the hash during login.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

// When a user signs up:
String hash = passwordEncoder.encode(rawPassword);
userRepository.save(new AppUser(email, hash, "USER"));` },
        { type: 'note', value: 'Hashing is one-way. You cannot recover a password from its hash, so a password reset must issue a new one, not show the old one.' },
      ],
    },
    {
      id: 'sb-method-security',
      title: 'Method security and tokens',
      blocks: [
        { type: 'text', value: '@PreAuthorize checks a rule before a method runs, so a service method is protected even when it is called from somewhere other than a controller. APIs often use JWT tokens instead of sessions; the server checks each token on every request.' },
        { type: 'code', lang: 'java', tryIt: false, value: `import org.springframework.security.access.prepost.PreAuthorize;

@Service
public class CourseAdminService {

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCourse(Long id) {
        repository.deleteById(id);
    }
}` },
        { type: 'list', items: [
          'Enable method security with @EnableMethodSecurity',
          'Check ownership, not only roles: a user can edit only their own data',
          'Keep JWT lifetimes short and validate signature and expiry',
          'Use HTTPS in production so tokens are not sent in plain text',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'security',
      q: 'What does a SecurityFilterChain define?',
      options: ['The database schema', 'Which requests are public, authenticated or role-restricted', 'The build tool', 'The log format'],
      answer: 1,
      explain: 'It sets the access rules for each request path.',
    },
    {
      chapterId: 'security',
      q: 'Which password encoder should be used?',
      options: ['Plain text', 'MD5 with no salt', 'BCrypt, which is salted and slow', 'Base64'],
      answer: 2,
      explain: 'BCrypt is a salted, deliberately slow hash.',
    },
    {
      chapterId: 'security',
      q: 'What does @PreAuthorize("hasRole(\'ADMIN\')") do?',
      options: ['Creates an admin account', 'Checks the role before the method runs', 'Logs every call', 'Disables the method'],
      answer: 1,
      explain: 'It enforces the rule at method level.',
    },
    {
      chapterId: 'security',
      q: 'Why is a password reset not allowed to show the old password?',
      options: ['It is too slow', 'A hash cannot be reversed, so there is nothing to show', 'It is a bug in Spring', 'Passwords expire'],
      answer: 1,
      explain: 'Only a hash is stored, and hashing is one-way.',
    },
  ],
};
