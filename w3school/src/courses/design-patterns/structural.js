// Design Patterns chapter: Structural Patterns.

export default {
  id: 'structural',
  title: 'Structural Patterns',
  description: 'Adapter, Decorator, Facade, Proxy and Composite',
  icon: 'layers',
  lessons: [
    {
      id: 'dp-adapter-decorator',
      title: 'Adapter and Decorator',
      blocks: [
        { type: 'text', value: 'Adapter makes an incompatible interface usable by wrapping it. Decorator adds behaviour to an object without changing its class, by wrapping it in another object that implements the same interface.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Adapter: make an old API fit a new interface
interface PaymentGateway { void charge(int amount); }

class OldBankApi { void makePayment(double amount, String currency) { } }

class OldBankAdapter implements PaymentGateway {
    private final OldBankApi api = new OldBankApi();
    public void charge(int amount) { api.makePayment(amount, "BDT"); }
}

// Decorator: add logging without editing the class
class LoggingPayment implements PaymentGateway {
    private final PaymentGateway inner;
    LoggingPayment(PaymentGateway inner) { this.inner = inner; }
    public void charge(int amount) {
        System.out.println("charging " + amount);
        inner.charge(amount);
    }
}` },
        { type: 'note', value: 'Adapter changes the interface. Decorator keeps the interface and adds behaviour. Both use composition.' },
      ],
    },
    {
      id: 'dp-facade-proxy',
      title: 'Facade and Proxy',
      blocks: [
        { type: 'text', value: 'Facade gives a simple interface to a complex subsystem. Proxy stands in for another object and controls access to it, for example for lazy loading, caching or access control.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Facade: one call hides several subsystems
class CheckoutFacade {
    void checkout(Cart cart) {
        inventory.reserve(cart);
        payments.charge(cart);
        shipping.schedule(cart);
    }
}

// Proxy: same interface, extra control
class CachedCourseRepository implements CourseRepository {
    private final CourseRepository real;
    private Course cache;

    public Course findById(int id) {
        if (cache == null) cache = real.findById(id);
        return cache;
    }
}` },
        { type: 'note', value: 'A Facade simplifies; a Proxy controls. Both are common in real frameworks under different names.' },
      ],
    },
    {
      id: 'dp-composite',
      title: 'Composite',
      blocks: [
        { type: 'text', value: 'Composite treats a group of objects and a single object the same way. A folder and a file both have a size; a menu and a menu item both render. It is a tree of parts that all share one interface.' },
        { type: 'code', lang: 'java', tryIt: false, value: `interface Node { int size(); }

class File implements Node {
    private final int bytes;
    File(int bytes) { this.bytes = bytes; }
    public int size() { return bytes; }
}

class Folder implements Node {
    private final List<Node> children = new ArrayList<>();
    void add(Node n) { children.add(n); }
    public int size() { return children.stream().mapToInt(Node::size).sum(); }
}` },
        { type: 'note', value: 'Composite is how file systems, UI trees and document structures are modeled. The client never checks whether it has a leaf or a branch.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'structural',
      q: 'What does Adapter do?',
      options: ['Adds behaviour', 'Makes an incompatible interface usable', 'Creates objects', 'Controls access'],
      answer: 1,
      explain: 'Adapter bridges two incompatible interfaces.',
    },
    {
      chapterId: 'structural',
      q: 'What does Decorator do?',
      options: ['Changes the interface', 'Adds behaviour without changing the class', 'Creates a tree', 'Simplifies a subsystem'],
      answer: 1,
      explain: 'Decorator wraps an object to add behaviour.',
    },
    {
      chapterId: 'structural',
      q: 'What does a Facade provide?',
      options: ['A complex API', 'A simple interface to a complex subsystem', 'A new object', 'Access control'],
      answer: 1,
      explain: 'Facade simplifies a subsystem.',
    },
    {
      chapterId: 'structural',
      q: 'What does Composite let you do?',
      options: ['Treat a group and a single object the same way', 'Replace an interface', 'Create a singleton', 'Cache data'],
      answer: 0,
      explain: 'Composite models trees with one interface.',
    },
  ],
};
