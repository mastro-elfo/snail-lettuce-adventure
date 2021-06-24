export class EndDateLimitExceeded extends Error {
  constructor(...args) {
    super(...args);
    this.name = "EndDateLimitExceeded";
  }
}
