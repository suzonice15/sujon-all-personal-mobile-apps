// Laravel chapter: Real-time & Broadcasting.

export default {
  id: 'laravel-realtime',
  title: 'Real-time & Broadcasting',
  description: 'Events, WebSockets, Reverb and live UI',
  icon: 'wifi-tethering',
  lessons: [
    {
      id: 'laravel-realtime-events',
      title: 'Events & Listeners',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
event(new OrderShipped($order));

class SendShipmentNotification implements ShouldQueue
{
    public function handle(OrderShipped $event): void
    {
        Mail::to($event->order->user)->send(new ShippedMail($event->order));
    }
}` },
      ],
    },
    {
      id: 'laravel-realtime-broadcasting',
      title: 'Broadcasting',
      blocks: [
        { type: 'code', lang: 'php', value: String.raw`<?php
class OrderShipped implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public function broadcastOn(): array
    {
        return [new PrivateChannel('orders.' . $this->order->id)];
    }
}

// Laravel Reverb
$ php artisan reverb:start` },
        { type: 'text', value: 'Use Echo on frontend to listen to channels and update UI in real time.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'laravel-realtime', q: 'ShouldBroadcast makes event?', options: ['Broadcast to WebSocket clients', 'Queue only', 'Cache', 'Log'], answer: 0, explain: 'Broadcasts to channels.' },
    { chapterId: 'laravel-realtime', q: 'Which driver scales broadcasts across servers?', options: ['Redis', 'File', 'Array', 'Sync'], answer: 0, explain: 'Redis pub/sub shares events between nodes.' },
    { chapterId: 'laravel-realtime', q: 'Private channels require?', options: ['An authorization callback', 'A public URL', 'CORS only', 'A response cache'], answer: 0, explain: 'The channel must authorize the user.' },
  ],
};
