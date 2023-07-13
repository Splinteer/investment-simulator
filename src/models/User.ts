export class User {
	age: number;
	monthlyInvestment: number;
	annualIncreasePercent: number;
	investmentStopAge: number;

	constructor(
		age: number,
		monthlyInvestment: number,
		annualIncreasePercent: number,
		investmentStopAge: number
	) {
		this.age = age;
		this.monthlyInvestment = monthlyInvestment;
		this.annualIncreasePercent = annualIncreasePercent;
		this.investmentStopAge = investmentStopAge;
	}
}
