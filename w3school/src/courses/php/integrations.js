// PHP chapter: Real-World Integrations. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it loads the GD (images) and XML extensions automatically when a sample uses them.

export default {
  id: 'integrations',
  title: 'Real-World Integrations',
  description: 'Email, payment gateways, images, PDF/Excel, XML and scraping',
  icon: 'extension',
  lessons: [
    {
      id: 'php-email',
      title: 'Sending Email',
      blocks: [
        { type: 'text', value: 'Never use PHP\'s mail() in production: it has no authentication, poor deliverability and is easy to abuse. Send through SMTP or an email API (Amazon SES, Mailgun, Postmark, Brevo) with a library such as Symfony Mailer or PHPMailer.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// composer require symfony/mailer
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;

$transport = Transport::fromDsn($_ENV['MAILER_DSN']);   // smtp://user:pass@smtp.example.com:587
$mailer = new Mailer($transport);

$email = (new Email())
    ->from('CodeNest <no-reply@codenest.app>')
    ->to($user->email)
    ->replyTo('support@codenest.app')
    ->subject('Your certificate is ready')
    ->text("Hi {$user->name}, congratulations on finishing the PHP course!")
    ->html($twig->render('emails/certificate.html.twig', ['user' => $user]))
    ->attachFromPath(__DIR__ . "/certificates/{$user->id}.pdf");

$mailer->send($email);` },
        { type: 'list', items: [
          'Send emails from a queue job, never inside the web request (slow SMTP servers, retries).',
          'Set up SPF, DKIM and DMARC DNS records for your domain or your mail lands in spam.',
          'In development use Mailpit or Mailtrap to catch emails instead of sending them to real people.',
          'Escape user data in HTML emails exactly like in web pages.',
        ] },
      ],
    },
    {
      id: 'php-payments',
      title: 'Payment Gateway Integration',
      blocks: [
        { type: 'text', value: 'Local gateways (SSLCommerz, bKash, Nagad, aamarPay) and international ones (Stripe, PayPal) follow the same flow. The golden rule: never trust the browser redirect. Confirm the payment server-to-server before marking an order as paid.' },
        { type: 'list', items: [
          '1. Create the order in your database with status pending and a unique transaction id.',
          '2. Call the gateway API to create a payment session; redirect the customer to its payment page.',
          '3. The customer pays; the gateway redirects back to your success URL (do NOT trust this alone).',
          '4. The gateway also calls your IPN/webhook URL server-to-server. Verify the signature or call the gateway\'s validation API.',
          '5. Check the amount and currency match the order, then mark it paid in a transaction. Make this idempotent: the webhook may arrive twice.',
        ] },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
declare(strict_types=1);

// Simulated webhook handler: signature check, amount check and idempotency
final class PaymentWebhook
{
    private array $processed = [];   // a UNIQUE column on transaction_id in a real database

    public function __construct(private string $secret, private array &$orders) {}

    public function handle(string $payload, string $signature): array
    {
        if (!hash_equals(hash_hmac('sha256', $payload, $this->secret), $signature)) {
            return [401, 'invalid signature'];
        }
        $event = json_decode($payload, true, 512, JSON_THROW_ON_ERROR);
        $order = $this->orders[$event['order_id']] ?? null;

        if ($order === null) return [404, 'unknown order'];
        if (isset($this->processed[$event['transaction_id']])) return [200, 'already processed'];
        if ($event['amount'] !== $order['amount'] || $event['currency'] !== 'BDT') {
            return [422, 'amount mismatch, flag for review'];
        }
        $this->orders[$event['order_id']]['status'] = 'paid';
        $this->processed[$event['transaction_id']] = true;
        return [200, 'order marked as paid'];
    }
}

$secret = 'whsec_test_123';
$orders = ['ORD-7' => ['amount' => 259900, 'status' => 'pending']];
$hook = new PaymentWebhook($secret, $orders);
$sign = fn(string $p) => hash_hmac('sha256', $p, $secret);

$good = json_encode(['order_id' => 'ORD-7', 'transaction_id' => 'TXN-1', 'amount' => 259900, 'currency' => 'BDT']);
$cheat = json_encode(['order_id' => 'ORD-7', 'transaction_id' => 'TXN-2', 'amount' => 100, 'currency' => 'BDT']);

foreach ([[$good, $sign($good)], [$good, $sign($good)], [$good, 'forged'], [$cheat, $sign($cheat)]] as [$payload, $sig]) {
    [$status, $msg] = $hook->handle($payload, $sig);
    echo "$status $msg\n";
}
echo "Order status: {$orders['ORD-7']['status']}\n";` },
        { type: 'note', value: 'Keep gateway credentials in environment variables, use the sandbox first, log every webhook request, and never store card numbers yourself: hosted payment pages keep you out of PCI scope.' },
      ],
    },
    {
      id: 'php-images-gd',
      title: 'Images with GD',
      blocks: [
        { type: 'text', value: 'The GD extension creates and edits images: thumbnails, watermarks, captchas, charts, certificates. (For heavy work use Imagick or a library like Intervention Image.) This sample draws a PNG and shows it in the rendered page.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$w = 360; $h = 200;
$img = imagecreatetruecolor($w, $h);

$bg = imagecolorallocate($img, 79, 91, 147);       // CodeNest purple
$white = imagecolorallocate($img, 255, 255, 255);
$gold = imagecolorallocate($img, 245, 158, 11);
imagefilledrectangle($img, 0, 0, $w, $h, $bg);

// A small bar chart
$scores = ['HTML' => 92, 'CSS' => 80, 'JS' => 74, 'PHP' => 88];
$x = 30;
foreach ($scores as $label => $score) {
    $barHeight = (int) ($score * 1.3);
    imagefilledrectangle($img, $x, 170 - $barHeight, $x + 50, 170, $gold);
    imagestring($img, 3, $x + 8, 175, $label, $white);
    imagestring($img, 2, $x + 14, 155 - $barHeight, (string) $score, $white);
    $x += 80;
}
imagestring($img, 4, 30, 10, 'Course scores', $white);

// Encode as PNG into a string and embed it as a data URI
ob_start();
imagepng($img);
$png = ob_get_clean();
imagedestroy($img);

echo "PNG size: ", strlen($png), " bytes\n";
echo '<img src="data:image/png;base64,' . base64_encode($png) . '" alt="chart">';` },
        { type: 'code', lang: 'php', value: String.raw`<?php
// Thumbnail of an uploaded photo, keeping the aspect ratio
function thumbnail(string $src, string $dest, int $maxWidth = 400): void
{
    [$width, $height, $type] = getimagesize($src);
    $source = match ($type) {
        IMAGETYPE_JPEG => imagecreatefromjpeg($src),
        IMAGETYPE_PNG => imagecreatefrompng($src),
        IMAGETYPE_WEBP => imagecreatefromwebp($src),
        default => throw new InvalidArgumentException('Unsupported image'),
    };
    $newHeight = (int) round($height * $maxWidth / $width);
    $thumb = imagescale($source, $maxWidth, $newHeight);
    imagewebp($thumb, $dest, 80);     // WebP: much smaller files
}` },
      ],
    },
    {
      id: 'php-pdf-excel',
      title: 'PDF and Excel Files',
      blocks: [
        { type: 'text', value: 'Invoices, certificates and reports are usually generated as PDF from an HTML template, and data exports as CSV or real Excel files.' },
        { type: 'code', lang: 'php', value: String.raw`<?php
// PDF from HTML: composer require dompdf/dompdf
use Dompdf\Dompdf;

$html = render('invoices/show.php', ['order' => $order]);   // your normal template
$pdf = new Dompdf(['defaultFont' => 'DejaVu Sans']);        // a font with Bangla/Unicode glyphs if needed
$pdf->loadHtml($html);
$pdf->setPaper('A4');
$pdf->render();

header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="invoice-' . $order->id . '.pdf"');
echo $pdf->output();

// Excel: composer require phpoffice/phpspreadsheet
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$sheet = ($book = new Spreadsheet())->getActiveSheet();
$sheet->fromArray(['Name', 'Email', 'Score'], null, 'A1');
$sheet->fromArray($rows, null, 'A2');
$sheet->getStyle('A1:C1')->getFont()->setBold(true);
(new Xlsx($book))->save(__DIR__ . '/report.xlsx');` },
        { type: 'note', value: 'For big exports (100,000+ rows) stream CSV with fputcsv() to php://output, or generate the file in a queue job and email a download link.' },
      ],
    },
    {
      id: 'php-xml',
      title: 'XML with SimpleXML',
      blocks: [
        { type: 'text', value: 'Many systems still speak XML: RSS feeds, sitemaps, bank and courier APIs, SOAP services. SimpleXML reads small documents easily.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$rss = <<<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CodeNest Blog</title>
    <item><title>PHP 8.3 is here</title><link>https://codenest.app/p/1</link><pubDate>Mon, 09 Mar 2026 10:00:00 +0600</pubDate><category>php</category></item>
    <item><title>Learn PDO</title><link>https://codenest.app/p/2</link><pubDate>Tue, 10 Mar 2026 09:00:00 +0600</pubDate><category>php</category><category>sql</category></item>
  </channel>
</rss>
XML;

$feed = simplexml_load_string($rss);
echo $feed->channel->title, "\n";
foreach ($feed->channel->item as $item) {
    $date = (new DateTimeImmutable((string) $item->pubDate))->format('d M');
    $tags = implode(', ', array_map('strval', iterator_to_array($item->category, false)));
    echo "- [$date] {$item->title} ($tags)\n";
}

// Build XML: a sitemap
$urls = ['/', '/courses/php', '/courses/php/oop'];
$sitemap = new SimpleXMLElement('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>');
foreach ($urls as $path) {
    $url = $sitemap->addChild('url');
    $url->addChild('loc', 'https://codenest.app' . $path);
    $url->addChild('changefreq', 'weekly');
}
echo $sitemap->asXML();` },
        { type: 'note', value: 'Never load XML from untrusted sources with external entities enabled (XXE attacks). Since PHP 8.0 / libxml 2.9 external entity loading is disabled by default; do not turn it back on with LIBXML_NOENT.' },
      ],
    },
    {
      id: 'php-scraping',
      title: 'Parsing HTML and Web Scraping',
      blocks: [
        { type: 'text', value: 'DOMDocument with XPath (or the new Dom\\HTMLDocument in PHP 8.4) parses real-world HTML. Use it to extract data, rewrite links, or sanitise content. Always respect a site\'s terms and robots.txt when scraping.' },
        { type: 'code', lang: 'php', tryIt: true, value: String.raw`<?php
$html = <<<'HTML'
<html><body>
  <div class="product" data-sku="KB-01"><h2>Mechanical Keyboard</h2><span class="price">৳ 4,500</span><a href="/p/kb-01">View</a></div>
  <div class="product" data-sku="MS-02"><h2>Wireless Mouse</h2><span class="price">৳ 1,250</span><a href="/p/ms-02">View</a></div>
  <div class="ad">Sponsored</div>
</body></html>
HTML;

$doc = new DOMDocument();
libxml_use_internal_errors(true);                  // real HTML is rarely perfect
$doc->loadHTML('<?xml encoding="UTF-8">' . $html);  // keep UTF-8 characters intact
$xpath = new DOMXPath($doc);

$products = [];
foreach ($xpath->query('//div[contains(@class, "product")]') as $node) {
    $price = $xpath->query('.//span[@class="price"]', $node)->item(0)->textContent;
    $products[] = [
        'sku' => $node->getAttribute('data-sku'),
        'name' => trim($xpath->query('.//h2', $node)->item(0)->textContent),
        'price' => (int) preg_replace('/\D/', '', $price),
        'url' => 'https://shop.example' . $xpath->query('.//a', $node)->item(0)->getAttribute('href'),
    ];
}
echo json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), "\n";
echo "Total: ", array_sum(array_column($products, 'price')), " Tk\n";` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'integrations', q: 'Why not use mail() in production?', options: ['It is deprecated', 'No authentication, poor deliverability; use SMTP or an email API with a library', 'It only sends plain text', 'It needs a database'], answer: 1, explain: 'Symfony Mailer or PHPMailer with SMTP/API is the standard.' },
    { chapterId: 'integrations', q: 'When should an order be marked as paid?', options: ['When the customer returns to the success URL', 'After the server verifies the payment with the gateway (signature/validation API)', 'When the customer clicks Pay', 'When the order is created'], answer: 1, explain: 'Browser redirects can be faked; confirm server-to-server.' },
    { chapterId: 'integrations', q: 'Why must a payment webhook handler be idempotent?', options: ['To be faster', 'Gateways may send the same notification more than once', 'To support refunds', 'Because of HTTPS'], answer: 1, explain: 'Processing it twice must not double-credit the order.' },
    { chapterId: 'integrations', q: 'Which extension creates and edits images?', options: ['PDO', 'GD (or Imagick)', 'mbstring', 'cURL'], answer: 1, explain: 'GD is bundled with most PHP installations.' },
    { chapterId: 'integrations', q: 'Which tool selects nodes in an HTML/XML document?', options: ['preg_match only', 'XPath via DOMXPath', 'json_decode', 'explode'], answer: 1, explain: 'XPath expressions like //div[@class="price"] are robust.' },
    { chapterId: 'integrations', q: 'What is an XXE attack?', options: ['A CSS bug', 'Malicious XML external entities reading server files or making requests', 'An email spoof', 'A slow query'], answer: 1, explain: 'Do not enable external entity loading for untrusted XML.' },
  ],
};
