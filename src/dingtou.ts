class Wealth {
  INCOME: number = 7800;
  RENT: number = 2700;
  EAT: number = 1050;
  // 存量资金
  stockMoney: number = 4000;
  // 消费比例
  spendPercent: number = 0.2;
  // 投资比例
  investmentPercentMap: Map<number, number> = new Map([
    [100000, 0.85],
    [500000, 0.8],
    [1000000, 0.75],
    [2000000, 0.7],
    [5000000, 0.65],
    [999999999999, 0.6],
  ]);
  // 单程路费
  oneRoadPay: number = 4;
  // 工作天数
  workDay: number = 22;
  // 地铁第一次打折区间
  firstDiscountSection: number = 100;
  // 地铁第一档折扣
  firstDiscountNumber: number = 0.8;
  // 地铁第二次打折区间
  lastDiscountSection: number = 150;
  // 地铁第二档折扣
  lastDiscountNumber: number = 0.5;
  /**
   * 获取乘坐地铁所需要的总消费
   * @returns {number} 消费
   */
  getBusPay(): number {
    // 总共乘车次数
    const totalCount: number = this.workDay * 2;
    // 第一次打折后单程消费
    const firstDiscountPay: number = this.oneRoadPay * this.firstDiscountNumber;
    // 第二次打折后单程消费
    const lastDiscountPay: number = this.oneRoadPay * this.lastDiscountNumber;
    // 到达第一次折扣需要的乘车次数
    const firstFullCount: number = Math.ceil(this.firstDiscountSection / this.oneRoadPay);
    // 到达第一次折扣花费的车费
    const firstFullPay: number = firstFullCount * this.oneRoadPay;
    // 到达第二次折扣需要的乘车次数
    const lastFullCount: number = Math.ceil((this.lastDiscountSection - firstFullPay) / firstDiscountPay);
    // 到达第一次折扣花费的车费
    const lastFullPay: number = lastFullCount * firstDiscountPay;
    // 到达第二次折扣点的总乘车次数
    const arriveNumber: number = firstFullCount + lastFullCount;

    if (arriveNumber > totalCount) {
      return firstFullPay + (totalCount - firstFullCount) * firstDiscountPay;
    } else {
      return firstFullPay + lastFullPay + (totalCount - arriveNumber) * lastDiscountPay;
    }
  }
  /**
   * 获取每个月的结余
   * @returns {number} 月结余
   */
  getBalance(): number {
    return this.INCOME - this.RENT - this.EAT - this.getBusPay();
  }
  /**
   * 获取可用于投资的比例系数
   * @returns {number} 比例
   */
  getInvestmentPercent(): number {
    let result: number = 0.5;

    for (const key of this.investmentPercentMap.keys()) {
      if (this.stockMoney < key) {
        result = (this.investmentPercentMap.get(key) as number);
        break;
      }
    }

    return result;
  }
  /**
   * 打印当前信息
   */
  printInfo() {
    const info: string = `
      当月结余：${this.getBalance()},
      投资系数：${this.getInvestmentPercent()},
    `;
    console.log(info);
  }
}

const www = new Wealth();
www.printInfo();