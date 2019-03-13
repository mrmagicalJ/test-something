class Wealth {
  private INCOME: number = 7000;
  private RENT: number = 2700;
  private EAT: number = 1050;
  // 存量资金
  private stockMoney: number = 4000;
  // 消费比例
  private spendPercent: number = 0.4;
  // 投资比例
  private investmentPercentMap: Map<number, number> = new Map([
    [100000, 0.85],
    [500000, 0.8],
    [1000000, 0.75],
    [2000000, 0.7],
    [5000000, 0.65],
    [999999999999, 0.6],
  ]);
  // 单程路费
  private oneRoadPay: number = 4;
  // 工作天数
  private workDay: number = 22;
  // 地铁第一次打折区间
  private firstDiscountSection: number = 100;
  // 地铁第一档折扣
  private firstDiscountNumber: number = 0.8;
  // 地铁第二次打折区间
  private lastDiscountSection: number = 150;
  // 地铁第二档折扣
  private lastDiscountNumber: number = 0.5;

  /**
   * 打印当前信息
   */
  public printInfo() {
    const balance: number = this.getBalance();
    const investmentPercent: number = this.getInvestmentPercent();

    const spend: number = Math.round(balance *　this.spendPercent);
    const investment: number = ((balance * 100) - (spend * 100)) / 100;
    const fixedInvestment: number = Math.round(investment * investmentPercent);

    const info: string = `
      当月结余：${balance},
      当月可用消费总额：${spend},
      投资系数：${investmentPercent},
      投资货基金额：${((investment * 1000) - (fixedInvestment * 1000)) / 1000},
      可用定投金额：${fixedInvestment}`;
    console.log(info);
  }

  /**
   * 获取乘坐地铁所需要的总消费
   * @returns {number} 消费
   */
  private getBusPay(): number {
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
  private getBalance(): number {
    return this.INCOME - this.RENT - this.EAT - this.getBusPay();
  }
  /**
   * 获取可用于投资的比例系数
   * @returns {number} 比例
   */
  private getInvestmentPercent(): number {
    let result: number = 0.5;

    for (const key of this.investmentPercentMap.keys()) {
      if (this.stockMoney < key) {
        result = (this.investmentPercentMap.get(key) as number);
        break;
      }
    }

    return result;
  }
}

const www = new Wealth();
www.printInfo();
