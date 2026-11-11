// Laravel chapter: Migrations & Seeding. Lessons plus this chapter's quiz questions.

export default {
  id: 'migrations-seeding',
  title: 'Migrations & Seeding',
  description: 'Version-control your database schema and seed data',
  icon: 'storage',
  lessons: [
    {
      id: 'laravel-migrations-intro',
      title: 'How Migrations Work',
      blocks: [
        { type: 'text', value: 'A migration is a PHP file that describes one change to the database schema: creating a table, adding a column, or creating an index. Laravel runs migrations in filename order and records each one in the migrations table, so every environment (local, staging, production) ends up with the same schema from the same code.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan make:migration create_posts_table
php artisan migrate
php artisan migrate:status` },
        { type: 'code', lang: 'php', value: String.raw`<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('body');
            $table->boolean('published')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};` },
        { type: 'list', items: [
          'The filename timestamp controls order: 2026_02_14_101500_create_posts_table.php runs after earlier timestamps.',
          'Laravel 11 and 12 generate anonymous class migrations, so two files never clash over a class name.',
          'up() applies the change; down() must undo it so rollbacks keep working.',
          'Keep one logical change per migration. A schema change mixed with unrelated data fixes is hard to review and roll back.',
          'Never edit a migration that has already run on shared environments. Add a new migration instead.',
        ] },
        { type: 'note', value: 'MySQL commits DDL immediately, so a failed migration cannot be rolled back automatically. Design each step to be safe, and take a backup before changing production tables.' },
      ],
    },
    {
      id: 'laravel-migration-columns',
      title: 'Columns, Types and Modifiers',
      blocks: [
        { type: 'text', value: 'Column types describe what the database stores; modifiers refine a column with nullability, defaults, indexes and comments. Choose the smallest type that fits the domain and let the database enforce rules whenever possible.' },
        { type: 'code', lang: 'php', value: String.raw`Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->uuid('public_id')->unique();
    $table->string('name', 120);
    $table->string('slug')->unique();
    $table->text('description')->nullable();
    $table->unsignedInteger('stock')->default(0);
    $table->decimal('price', 10, 2);
    $table->enum('status', ['draft', 'active', 'archived'])->default('draft');
    $table->json('options')->nullable();
    $table->timestamp('published_at')->nullable();
    $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
    $table->timestamps();
    $table->softDeletes();
});` },
        { type: 'list', items: [
          'id() creates an auto-incrementing unsigned big integer primary key; use uuid() or ulid() for distributed ids.',
          'string() defaults to VARCHAR(255); give an explicit length when you know it.',
          'integer(), bigInteger(), boolean(), decimal(), date(), dateTime(), json() and text() cover most application data.',
          'Modifiers chain: nullable(), default(), unique(), index(), primary(), comment(), useCurrent() and constrained().',
          'Use decimal(10, 2) or integer minor units for money. Float rounding will corrupt prices and totals.',
        ] },
        { type: 'code', lang: 'php', value: String.raw`Schema::table('products', function (Blueprint $table) {
    $table->string('sku')->nullable()->after('name');
    $table->index('status');
});

Schema::table('products', function (Blueprint $table) {
    $table->dropColumn('sku');
});` },
        { type: 'note', value: 'Laravel 11 and later change columns natively on most databases, but heavy alterations can still rebuild a table. On large production tables, plan a maintenance window or use an online schema change tool.' },
      ],
    },
    {
      id: 'laravel-migration-indexes',
      title: 'Foreign Keys and Indexes',
      blocks: [
        { type: 'text', value: 'A foreign key guarantees that a child row points at a real parent row, and an index makes lookups fast. Laravel creates both with one fluent call, which is why foreignId()->constrained() is the standard way to model a relationship column.' },
        { type: 'code', lang: 'php', value: String.raw`Schema::create('comments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('post_id')->constrained()->cascadeOnDelete();
    $table->foreignId('user_id')->constrained()->nullOnDelete();
    $table->foreignId('parent_id')->nullable()->constrained('comments')->cascadeOnDelete();
    $table->text('body');
    $table->timestamps();

    $table->index(['post_id', 'created_at']);
});` },
        { type: 'code', lang: 'php', value: String.raw`Schema::create('post_tag', function (Blueprint $table) {
    $table->foreignId('post_id')->constrained()->cascadeOnDelete();
    $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
    $table->primary(['post_id', 'tag_id']);
});` },
        { type: 'list', items: [
          'constrained() guesses the table from the column name: user_id points at users.id. Pass a table name when that guess is wrong.',
          'cascadeOnDelete deletes children with the parent; nullOnDelete keeps the child and clears the key; restrictOnDelete blocks the delete until children are handled.',
          'Index every column you filter, join or sort by. A missing index turns a fast lookup into a full table scan.',
          'The pivot composite primary key prevents duplicate rows and also serves as an index for both columns.',
          'MySQL automatically indexes foreign keys, but other databases may not; add explicit indexes where needed.',
        ] },
        { type: 'note', value: 'Keep index names under 64 characters in MySQL. If the generated name is too long, pass a shorter name as the second argument to index() or unique().' },
      ],
    },
    {
      id: 'laravel-migration-run',
      title: 'Running, Rolling Back and Resetting',
      blocks: [
        { type: 'text', value: 'Migrations are applied in batches. You can roll back the last batch, rebuild the whole schema, or inspect what has run. These commands are routine locally and dangerous in production, so know exactly what each one does.' },
        { type: 'code', lang: 'text', value: String.raw`php artisan migrate
php artisan migrate --pretend
php artisan migrate:status
php artisan migrate:rollback
php artisan migrate:rollback --step=1
php artisan migrate:refresh --seed
php artisan migrate:fresh --seed` },
        { type: 'list', items: [
          'migrate runs every migration that has not been applied yet and records the batch.',
          '--pretend prints the SQL without running it, which is useful for review.',
          'migrate:rollback undoes the last batch; --step=1 undoes exactly one migration.',
          'migrate:refresh rolls back every migration and runs them again.',
          'migrate:fresh drops every table and runs all migrations from scratch. It ignores rollback logic and destroys data.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ php artisan migrate --force
INFO  Running migrations.

2026_02_14_101500_create_posts_table ....................... 42ms DONE
2026_02_14_101600_add_slug_to_posts_table ................. 18ms DONE` },
        { type: 'note', value: 'In production always use --force in non-interactive deploys, and never run migrate:fresh or migrate:refresh. A safe routine is: back up, run pending migrations, then run only additive seeders.' },
      ],
    },
    {
      id: 'laravel-seeders',
      title: 'Seeders',
      blocks: [
        { type: 'text', value: 'A seeder fills the database with data. Development seeders create realistic demo content with factories; production seeders create required reference data such as roles, settings or currencies. Keep those two jobs separate.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()
            ->count(10)
            ->has(Post::factory()->count(5))
            ->create();

        $this->call([
            RoleSeeder::class,
            SettingSeeder::class,
        ]);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['admin', 'editor', 'viewer'] as $name) {
            Role::updateOrCreate(
                ['name' => $name],
                ['description' => ucfirst($name) . ' role'],
            );
        }
    }
}` },
        { type: 'list', items: [
          'Call seeders from DatabaseSeeder with $this->call([...]) so the order is explicit.',
          'Factories generate fake data and relationships; mix has(), for() and state methods to build realistic graphs.',
          'Write production seeders with updateOrCreate or firstOrCreate so running them twice does not duplicate rows.',
          'Run a single seeder with php artisan db:seed --class=RoleSeeder, and add --force in production.',
          'Never rely on random factory data in production: emails, passwords and totals would be meaningless.',
        ] },
        { type: 'note', value: 'Seeding a large dataset is slow because each model fires events. For big imports use chunked inserts or bulk writes from the Advanced Eloquent chapter instead of factories.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'migrations-seeding', q: 'Which table does Laravel use to track which migrations have run?', options: ['migrations', 'schema_history', 'laravel_migrations', 'phinxlog'], answer: 0, explain: 'Laravel records each applied migration in the migrations table together with its batch number.' },
    { chapterId: 'migrations-seeding', q: 'Which method in a migration applies the change?', options: ['up()', 'down()', 'apply()', 'run()'], answer: 0, explain: 'up() applies the schema change and down() reverses it during a rollback.' },
    { chapterId: 'migrations-seeding', q: 'What does migrate:fresh do?', options: ['Rolls back the last batch', 'Drops all tables and re-runs every migration', 'Refreshes only seed data', 'Creates a backup then migrates'], answer: 1, explain: 'migrate:fresh drops every table without running down() methods, then runs all migrations from scratch.' },
    { chapterId: 'migrations-seeding', q: 'foreignId("user_id")->constrained() points at which table and column by convention?', options: ['user.id', 'users.user_id', 'users.id', 'user_id.id'], answer: 2, explain: 'constrained() pluralises the column prefix and assumes the id column, so user_id references users.id.' },
    { chapterId: 'migrations-seeding', q: 'Which column type should store money?', options: ['float', 'decimal', 'double', 'string'], answer: 1, explain: 'Decimal stores exact values. Float and double introduce binary rounding errors that corrupt money totals.' },
    { chapterId: 'migrations-seeding', q: 'Why should production seeders use updateOrCreate?', options: ['To make them safe to run repeatedly', 'To bypass mass assignment', 'To run faster', 'To delete old rows automatically'], answer: 0, explain: 'updateOrCreate finds an existing row or creates it, so re-running the seeder does not duplicate reference data.' },
    { chapterId: 'migrations-seeding', q: 'With no options, what does migrate:rollback revert?', options: ['Everything', 'The last batch', 'The first migration', 'Only failed migrations'], answer: 1, explain: 'Migrations are grouped into batches; rollback undoes the most recent batch unless you pass --step.' },
  ],
};
