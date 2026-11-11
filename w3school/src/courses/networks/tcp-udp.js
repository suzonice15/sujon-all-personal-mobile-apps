// Networks chapter: TCP and UDP.

export default {
  id: 'tcp-udp',
  title: 'TCP & UDP',
  description: 'Reliability, handshakes, flow control and ports',
  icon: 'swap-horiz',
  lessons: [
    {
      id: 'net-tcp-handshake',
      title: 'The TCP handshake',
      blocks: [
        { type: 'text', value: 'TCP opens a connection with a three-way handshake: SYN, SYN-ACK, ACK. It then delivers bytes in order, retransmits lost segments and closes with FIN or RST.' },
        { type: 'code', lang: 'text', tryIt: false, value: `client -> server: SYN (seq=x)
server -> client: SYN-ACK (seq=y, ack=x+1)
client -> server: ACK (ack=y+1)
connection established` },
        { type: 'note', value: 'The handshake costs one round trip before data. TLS adds another. That is why connection reuse and keep-alive matter.' },
      ],
    },
    {
      id: 'net-tcp-reliability',
      title: 'Reliability and flow control',
      blocks: [
        { type: 'list', items: [
          'Sequence numbers order the bytes',
          'ACKs confirm delivery',
          'Lost segments are retransmitted',
          'Window size prevents overwhelming the receiver',
          'Congestion control slows down on loss',
          'Head-of-line blocking can delay later data',
        ] },
        { type: 'text', value: 'TCP is reliable but not magic. A slow or lossy network still causes delay, and one lost segment can hold up the stream until it is retransmitted.' },
        { type: 'note', value: 'HTTP/2 multiplexes streams over one TCP connection. HTTP/3 uses QUIC over UDP to avoid TCP head-of-line blocking.' },
      ],
    },
    {
      id: 'net-udp',
      title: 'UDP',
      blocks: [
        { type: 'text', value: 'UDP is connectionless. It sends datagrams with no handshake, no ordering and no retransmission. It is fast and simple, which suits DNS, video, games and QUIC.' },
        { type: 'code', lang: 'text', tryIt: false, value: `UDP header:
source port | destination port | length | checksum
(no sequence, no ACK, no connection state)` },
        { type: 'note', value: 'If you need reliability over UDP, the application must add it. QUIC does exactly that for HTTP/3.' },
      ],
    },
    {
      id: 'net-sockets',
      title: 'Sockets and ports',
      blocks: [
        { type: 'text', value: 'A socket is an IP address plus a port. A server listens on a port; a client uses an ephemeral port for the connection. The pair identifies the conversation.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `ss -tan
# State  Local Address:Port      Peer Address:Port
# LISTEN 0.0.0.0:443            0.0.0.0:*
# ESTAB  10.0.0.5:51234         203.0.113.10:443` },
        { type: 'note', value: 'Too many connections in TIME_WAIT can exhaust ports on a busy server. Connection reuse and tuning help.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'tcp-udp',
      q: 'How many steps are in the TCP handshake?',
      options: ['Two', 'Three', 'Four', 'None'],
      answer: 1,
      explain: 'SYN, SYN-ACK, ACK.',
    },
    {
      chapterId: 'tcp-udp',
      q: 'Which protocol is connectionless?',
      options: ['TCP', 'UDP', 'TLS', 'HTTP'],
      answer: 1,
      explain: 'UDP sends datagrams without a handshake.',
    },
    {
      chapterId: 'tcp-udp',
      q: 'What does TCP do when a segment is lost?',
      options: ['Ignores it', 'Retransmits it', 'Closes the app', 'Changes the port'],
      answer: 1,
      explain: 'Sequence numbers and ACKs drive retransmission.',
    },
    {
      chapterId: 'tcp-udp',
      q: 'Why does HTTP/3 use QUIC over UDP?',
      options: ['UDP is encrypted', 'To avoid TCP head-of-line blocking', 'To use fewer ports', 'Because DNS requires it'],
      answer: 1,
      explain: 'QUIC provides reliability per stream without one TCP stream blocking others.',
    },
  ],
};
