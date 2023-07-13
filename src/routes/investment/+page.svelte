<script lang="ts">
	import { Investment } from '../../models/Investments';

	let annualOrMonthlyYield: number;
	let investmentPercent: number;
	let investmentCap: number;

	function createInvestment() {
		const investment = new Investment(annualOrMonthlyYield, investmentPercent, investmentCap);
		// save investment or do something with investment object
	}
</script>

<form on:submit|preventDefault={createInvestment}>
	<!-- input fields for annualOrMonthlyYield, investmentPercent, etc. -->
</form>
