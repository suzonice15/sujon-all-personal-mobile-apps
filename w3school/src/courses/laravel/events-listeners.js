// Laravel chapter: Events & Notifications. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'events-listeners',
  title: 'Events & Notifications',
  description: 'Decouple features with events, listeners, mail and notifications',
  icon: 'notifications',
  lessons: [
    {
      id: 'laravel-events',
      title: 'Events and Listeners',
      blocks: [
        { type: 'text', value: 'An event says that something happened. A listener reacts to it. The code that dispatches the event does not know or care who listens, so you can add emails, analytics or webhooks later without editing the checkout flow.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderPaid
{
    use Dispatchable, SerializesModels;

    public function __construct(public Order $order)
    {
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Listeners;

use App\Events\OrderPaid;
use App\Services\ReceiptMailer;

class SendReceipt
{
    public function __construct(private ReceiptMailer $mailer)
    {
    }

    public function handle(OrderPaid $event): void
    {
        $this->mailer->sendFor($event->order);
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

use App\Events\OrderPaid;
use App\Models\Order;

$order = Order::findOrFail($id);
$order->markPaid($transaction);

OrderPaid::dispatch($order);

// Or register manually when auto-discovery is disabled
Event::listen(OrderPaid::class, SendReceipt::class);` },
        { type: 'list', items: [
          'Laravel 11 discovers listeners in app/Listeners automatically; older apps list them in EventServiceProvider.',
          'php artisan make:event OrderPaid and php artisan make:listener SendReceipt --event=OrderPaid scaffold both classes.',
          'A listener handle() method type-hints the event, so the container can inject other dependencies too.',
          'An event can have many listeners; one listener can listen to many events by adding more type-hinted methods.',
        ] },
        { type: 'note', value: 'Events are for things that already happened. Do not use them as a hidden command bus: if the caller must know the result, call a service directly. Name events in the past tense, such as OrderPaid or UserRegistered.' },
      ],
    },
    {
      id: 'laravel-observers',
      title: 'Model Observers',
      blocks: [
        { type: 'text', value: 'Observers group Eloquent model event handlers in one class. They are perfect for keeping a model consistent, for example creating a profile after a user is created or writing an audit row when a record changes.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Observers;

use App\Models\User;
use App\Models\Profile;

class UserObserver
{
    public function created(User $user): void
    {
        $user->profile()->create(['display_name' => $user->name]);
    }

    public function updated(User $user): void
    {
        if ($user->wasChanged('email')) {
            $user->email_verified_at = null;
            $user->saveQuietly();
        }
    }

    public function deleting(User $user): void
    {
        $user->tokens()->delete();
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Models;

use App\Observers\UserObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Foundation\Auth\User as Authenticatable;

#[ObservedBy(UserObserver::class)]
class User extends Authenticatable
{
}` },
        { type: 'list', items: [
          'Available hooks include creating, created, updating, updated, saving, saved, deleting, deleted, restoring and forceDeleted.',
          'saveQuietly(), updateQuietly() and deleteQuietly() skip events, which prevents infinite loops.',
          'Observers run inside the current transaction; use afterCommit when the side effect must wait for a commit.',
          'Keep observers small. Heavy work such as sending mail belongs in a queued listener or job.',
        ] },
        { type: 'note', value: 'Observers fire for every save, including mass updates only when Eloquent loads the models. A query-builder update does not trigger them. Choose explicitly between model events and database constraints.' },
      ],
    },
    {
      id: 'laravel-notifications',
      title: 'Notifications',
      blocks: [
        { type: 'text', value: 'Notifications send the same message through many channels: email, SMS, database, broadcast and custom drivers. The Notification class decides which channels are used and what each channel receives.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvoicePaid extends Notification
{
    use Queueable;

    public function __construct(private int $amount)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Invoice paid')
            ->greeting('Hello ' . $notifiable->name)
            ->line('We received your payment of ' . $this->amount . ' BDT.')
            ->action('View invoice', url('/invoices'))
            ->line('Thank you for your business.');
    }

    public function toArray(object $notifiable): array
    {
        return ['amount' => $this->amount];
    }
}` },
        { type: 'code', lang: 'php', value: String.raw`<?php

use App\Notifications\InvoicePaid;
use Illuminate\Support\Facades\Notification;

$user->notify(new InvoicePaid(2500));

Notification::send($admins, new InvoicePaid(2500));

// On-demand notification without a User model
Notification::route('mail', 'guest@example.com')
    ->notify(new InvoicePaid(2500));` },
        { type: 'list', items: [
          'Add the Notifiable trait to any model that should receive notifications.',
          'The database channel stores rows in the notifications table; run php artisan notifications:table and migrate.',
          'Implement ShouldQueue on the notification to send it in the background.',
          'Custom channels implement a send method and are registered in a service provider.',
        ] },
        { type: 'note', value: 'Never pass a password or a one-time code in a database notification shown in the UI without care. Also throttle notifications per user; a retry loop that notifies on every attempt can flood inboxes.' },
      ],
    },
    {
      id: 'laravel-mail',
      title: 'Mail and Markdown Mailables',
      blocks: [
        { type: 'text', value: 'A Mailable is a class that describes one email: sender, subject, view, attachments and data. Markdown mailables give you responsive, themeable HTML with very little markup.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Order $order)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Your order has shipped');
    }

    public function content(): Content
    {
        return new Content(markdown: 'mail.orders.shipped');
    }

    public function attachments(): array
    {
        return [
            Attachment::fromStorage('invoices/' . $this->order->number . '.pdf')
                ->as('invoice.pdf')
                ->withMime('application/pdf'),
        ];
    }
}` },
        { type: 'code', lang: 'html', value: String.raw`{{-- resources/views/mail/orders/shipped.blade.php --}}
<x-mail::message>
# Order {{ $order->number }} is on its way

Hello {{ $order->customer_name }},

Your parcel left our warehouse today.

<x-mail::button :url="url('/orders/' . $order->id)">
Track order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>` },
        { type: 'code', lang: 'php', value: String.raw`<?php

use App\Mail\OrderShipped;
use Illuminate\Support\Facades\Mail;

Mail::to($order->email)->send(new OrderShipped($order));

// Queue instead of blocking the request
Mail::to($order->email)->queue(new OrderShipped($order));
Mail::to($order->email)->later(now()->addMinutes(10), new OrderShipped($order));` },
        { type: 'list', items: [
          'Generate one with php artisan make:mail OrderShipped --markdown=mail.orders.shipped.',
          'Set MAIL_MAILER to smtp or a provider API in production; use Mailpit or log driver locally.',
          'Call queue() or implement ShouldQueue so the HTTP response is not held up by the mail server.',
          'Test with Mail::fake() and assertSent or assertQueued.',
        ] },
        { type: 'note', value: 'Email is not guaranteed delivery. Configure SPF, DKIM and DMARC for your domain, use a reputable provider, and never put sensitive data in a subject line.' },
      ],
    },
    {
      id: 'laravel-broadcasting',
      title: 'Broadcasting Basics',
      blocks: [
        { type: 'text', value: 'Broadcasting pushes server-side events to browsers over WebSockets. Mark an event ShouldBroadcast, choose a channel, and listen with Laravel Echo on the client. Pusher and Reverb are common drivers; Ably and Redis also work.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Order $order)
    {
    }

    public function broadcastOn(): array
    {
        return [new Channel('orders.' . $this->order->id)];
    }

    public function broadcastAs(): string
    {
        return 'order.status';
    }

    public function broadcastWith(): array
    {
        return ['status' => $this->order->status, 'updated_at' => $this->order->updated_at->toIso8601String()];
    }
}` },
        { type: 'code', lang: 'js', value: String.raw`import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: 8080,
    forceTLS: false,
});

window.Echo.channel('orders.42')
    .listen('.order.status', (payload) => {
        document.querySelector('#status').textContent = payload.status;
    });` },
        { type: 'list', items: [
          'Use a private channel for per-user data so the server can authorize access in routes/channels.php.',
          'Use presence channels when you also need to show who is online.',
          'Keep broadcastWith small: payloads travel over the network and are visible to clients.',
          'Run php artisan reverb:start (or configure Pusher) and keep the queue worker running for broadcast jobs.',
        ] },
        { type: 'note', value: 'Broadcasting is best-effort and not a database. Do not rely on it for critical state: persist the change first, then broadcast it. Clients should refetch after reconnecting.' },
      ],
    },
    {
      id: 'laravel-queued-listeners',
      title: 'Queued Listeners and Reliability',
      blocks: [
        { type: 'text', value: 'A listener that sends email, calls an API or writes a report should not slow down the request. Implement ShouldQueue and Laravel pushes the listener to the queue, where a worker handles it with retries and logging.' },
        { type: 'code', lang: 'php', value: String.raw`<?php

namespace App\Listeners;

use App\Events\OrderPaid;
use App\Services\AnalyticsClient;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SyncOrderToAnalytics implements ShouldQueue
{
    use InteractsWithQueue;

    public int $tries = 5;
    public int $timeout = 30;
    public bool $afterCommit = true;

    public function __construct(private AnalyticsClient $analytics)
    {
    }

    public function handle(OrderPaid $event): void
    {
        $this->analytics->track('order_paid', [
            'order_id' => $event->order->id,
            'total' => $event->order->total,
        ]);
    }

    public function backoff(): array
    {
        return [10, 60, 300];
    }

    public function failed(OrderPaid $event, \Throwable $exception): void
    {
        report($exception);
    }
}` },
        { type: 'list', items: [
          'Set afterCommit to true so a queued listener never runs for a transaction that later rolls back.',
          'Use backoff() to avoid hammering a failing third-party API.',
          'failed() is the place to alert, store a dead-letter row or mark the order as needing attention.',
          'Assign a queue name with onQueue() to isolate slow or low-priority listeners from critical ones.',
        ] },
        { type: 'note', value: 'Queued listeners are at-least-once: a job can run twice after a worker crash. Make the side effect idempotent, for example by sending an external id or checking whether the work was already done.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'events-listeners', q: 'Why use events instead of calling code directly?', options: ['They are faster', 'They decouple the dispatcher from the reactions', 'They replace the database', 'They avoid all errors'], answer: 1, explain: 'New reactions can be added without editing the code that dispatches the event.' },
    { chapterId: 'events-listeners', q: 'Which trait lets an Eloquent model receive notifications?', options: ['Notifiable', 'Dispatchable', 'SerializesModels', 'Queueable'], answer: 0, explain: 'Notifiable adds the notify() method and channel routing.' },
    { chapterId: 'events-listeners', q: 'What does an observer do?', options: ['It observes HTTP requests', 'It groups handlers for Eloquent model events', 'It watches queue failures', 'It logs SQL only'], answer: 1, explain: 'Observers handle creating, updated, deleted and similar model events.' },
    { chapterId: 'events-listeners', q: 'What does afterCommit on a queued listener prevent?', options: ['Duplicate emails', 'Running for a transaction that rolls back', 'Slow queries', 'Queue timeouts'], answer: 1, explain: 'The listener is only dispatched after the database transaction commits.' },
    { chapterId: 'events-listeners', q: 'Which method decides the channels of a Notification?', options: ['toMail', 'via', 'channels', 'route'], answer: 1, explain: 'via() returns channel names such as mail, database or broadcast.' },
    { chapterId: 'events-listeners', q: 'Why queue a Mailable in production?', options: ['Queued mail is always delivered', 'It avoids blocking the request on the mail server', 'It removes the need for SMTP', 'It encrypts the email'], answer: 1, explain: 'Sending mail synchronously can add seconds to a response.' },
    { chapterId: 'events-listeners', q: 'What should you use for per-user broadcast data?', options: ['A public channel', 'A private channel with authorization', 'An email', 'A database transaction'], answer: 1, explain: 'Private channels are authorized in routes/channels.php before the client can subscribe.' },
  ],
};
