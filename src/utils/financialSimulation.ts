import type { Investment } from '../models/Investments';
import type { User } from '../models/User';

export function simulateFinances(user: User, investments: Investment[]) {
	let totalInvestment = 0;
	for (let i = user.age; i < user.investmentStopAge; i++) {
		const yearlyInvestment = user.monthlyInvestment * 12;
		totalInvestment += yearlyInvestment;

		investments.forEach((investment) => {
			if (totalInvestment < investment.investmentCap) {
				totalInvestment += totalInvestment * (investment.annualOrMonthlyYield / 100);
			}
		});

		user.monthlyInvestment += user.monthlyInvestment * (user.annualIncreasePercent / 100);
	}

	return totalInvestment;
}
