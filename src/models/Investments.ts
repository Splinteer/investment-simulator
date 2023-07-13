export class Investment {
	name: string;
	amount: number;
	yieldPerYear: number;
	investmentPercent: number;
	investmentCap?: number;

	constructor(
		name: string,
		amount: number,
		yieldPerYear: number,
		investmentPercent: number,
		investmentCap?: number
	) {
		this.name = name;
		this.amount = amount;
		this.yieldPerYear = yieldPerYear;
		this.investmentPercent = investmentPercent;
		this.investmentCap = investmentCap;
	}
}
