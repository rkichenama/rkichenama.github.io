const BaseObservableComponent = () => (class  extends BaseComponent() {
  /**
   * clear inheritance chain and establish instance subject
   */
  constructor () {
    super(...arguments);
    this.subject = new Rx.Subject();
  }

  /**
   * add the change to the state to the Observable stream
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate (prevProps, prevState) {
    if (this.state !== prevState) {
      this.subject.onNext(this.state);
    }
  }

  /**
   * ensure all Observers are notified that there will be no more updates
   */
  componentWillUnmount () {
    this.subject.onCompleted();
  }
});
