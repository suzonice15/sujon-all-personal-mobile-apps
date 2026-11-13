// Design Patterns chapter: Behavioral Patterns.

export default {
  id: 'behavioral',
  title: 'Behavioral Patterns',
  description: 'Strategy, Observer, Command and State',
  icon: 'swap-horiz',
  lessons: [
    {
      id: 'dp-strategy-observer',
      title: 'Strategy and Observer',
      blocks: [
        { type: 'text', value: 'Strategy puts interchangeable algorithms behind one interface, so the caller can switch behaviour at runtime. Observer notifies many listeners when an event happens, without the sender knowing who they are.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// Strategy
interface Discount { int apply(int price); }
class NoDiscount implements Discount { public int apply(int p) { return p; } }
class EidDiscount implements Discount { public int apply(int p) { return p - 500; } }

class Checkout {
    private final Discount discount;
    Checkout(Discount d) { this.discount = d; }
    int total(int price) { return discount.apply(price); }
}

// Observer
interface Listener { void onEvent(String event); }
class EventBus {
    private final List<Listener> listeners = new ArrayList<>();
    void subscribe(Listener l) { listeners.add(l); }
    void publish(String e) { listeners.forEach(l -> l.onEvent(e)); }
}` },
        { type: 'note', value: 'Strategy replaces long if/else chains on a mode. Observer replaces polling and keeps modules decoupled.' },
      ],
    },
    {
      id: 'dp-command',
      title: 'Command',
      blocks: [
        { type: 'text', value: 'Command turns a request into an object. That makes it possible to queue, log, undo and retry operations. It is the basis of undo stacks, job queues and transaction logs.' },
        { type: 'code', lang: 'java', tryIt: false, value: `interface Command { void execute(); void undo(); }

class AddCourseCommand implements Command {
    private final List<Course> list;
    private final Course course;

    AddCourseCommand(List<Course> list, Course course) {
        this.list = list;
        this.course = course;
    }
    public void execute() { list.add(course); }
    public void undo() { list.remove(course); }
}` },
        { type: 'note', value: 'An undo feature is a stack of Command objects. A job queue is a list of Command objects waiting to run.' },
      ],
    },
    {
      id: 'dp-state-template',
      title: 'State and Template Method',
      blocks: [
        { type: 'text', value: 'State lets an object change its behaviour when its internal state changes, which removes large switch statements. Template Method defines the skeleton of an algorithm and lets subclasses fill in steps.' },
        { type: 'code', lang: 'java', tryIt: false, value: `// State
interface OrderState { void next(Order order); String name(); }
class NewOrder implements OrderState {
    public void next(Order o) { o.setState(new PaidOrder()); }
    public String name() { return "new"; }
}
class PaidOrder implements OrderState {
    public void next(Order o) { o.setState(new ShippedOrder()); }
    public String name() { return "paid"; }
}

// Template Method
abstract class Report {
    final String render() { return header() + body() + footer(); }
    abstract String body();
    String header() { return "Report\\n"; }
    String footer() { return "end"; }
}` },
        { type: 'note', value: 'State is often implemented with an enum and a switch in real code. Use the pattern when the transitions are complex and the object has real state-specific behaviour.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'behavioral',
      q: 'What does Strategy let you do?',
      options: ['Create objects', 'Switch algorithms at runtime behind one interface', 'Notify listeners', 'Undo actions'],
      answer: 1,
      explain: 'Strategy swaps interchangeable algorithms.',
    },
    {
      chapterId: 'behavioral',
      q: 'What does Observer do?',
      options: ['Notifies many listeners when an event happens', 'Creates a tree', 'Wraps an object', 'Caches data'],
      answer: 0,
      explain: 'Observer decouples senders from listeners.',
    },
    {
      chapterId: 'behavioral',
      q: 'What is Command useful for?',
      options: ['Formatting code', 'Queuing, logging and undoing requests', 'Creating singletons', 'Caching'],
      answer: 1,
      explain: 'Command turns a request into an object.',
    },
    {
      chapterId: 'behavioral',
      q: 'What does State replace?',
      options: ['Long switch statements on a mode', 'Interfaces', 'Tests', 'Databases'],
      answer: 0,
      explain: 'State moves behaviour into state objects.',
    },
  ],
};
