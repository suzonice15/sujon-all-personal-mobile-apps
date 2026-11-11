// Laravel chapter: Livewire & Filament.

export default {
  id: 'laravel-livewire-filament',
  title: 'Livewire & Filament',
  description: 'Full-stack components and admin panels',
  icon: 'dashboard',
  lessons: [
    {
      id: 'laravel-livewire',
      title: 'Livewire Components',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
class Counter extends Component
{
    public int $count = 0;
    public function increment(): void { $this->count++; }
    public function render() { return view('livewire.counter'); }
}

// blade
<div>
  <button wire:click="increment">+</button>
  <span>{{ $count }}</span>
</div>` },
      ],
    },
    {
      id: 'laravel-filament',
      title: 'Filament Admin',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`$ composer require filament/filament
$ php artisan filament:install --panels
$ php artisan make:filament-resource Product` },
        { type: 'list', items: [
          'Resources generate CRUD pages.',
          'Forms, tables, widgets and actions.',
          'Great for admin panels and internal tools.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'laravel-livewire-filament', q: 'Livewire allows?', options: ['Server-driven interactive UI', 'Only static pages', 'Database only', 'Queue only'], answer: 0, explain: 'Livewire handles reactivity server-side.' },
  ],
};
