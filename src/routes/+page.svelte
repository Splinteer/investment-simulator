<!-- src/routes/user.svelte -->
<script lang="ts">
	import { User } from '../models/User.js';
	import * as echarts from 'echarts';
	import { onMount } from 'svelte';

	let age: number = 29;
	let ageLimit: number = 80;
	let monthlyInvestment: number = 1100;
	let annualIncreasePercent: number = 10;
	let investmentStopAge: number = 60;

	// Investment
	import { Investment } from '../models/Investments';

	let investments: Investment[] = [
		// new Investment('PEA', 0, 10, 100, 150000)
		new Investment('PEA', 468, 5, 70, 150000),
		new Investment('AV1', 0, 3, 30)
	];

	let name: string;
	let yieldPerYear: number;
	let investmentPercent: number;
	let investmentCap: number;

	function createInvestment() {
		investments = [
			...investments,
			new Investment(name, yieldPerYear, investmentPercent, investmentCap)
		];
	}

	const legend = [age];
	for (let index = 1; index <= ageLimit - age; index++) {
		legend.push(age + index);
	}

	function round(number: number) {
		return +number.toFixed(2);
	}

	function calculerAugmentationInvestissement(
		montantInvestiInitial: number,
		anneesDinvestissement: number,
		evolutionAnnuelEnPourcent: number
	) {
		let montantInvesti = montantInvestiInitial;

		for (let annee = 1; annee <= anneesDinvestissement; annee++) {
			montantInvesti += round(montantInvesti * (evolutionAnnuelEnPourcent / 100));
		}

		return montantInvesti;
	}

	const data = investments.map((investment) => {
		const amounts = [investment.amount];

		let currentAmount = investment.amount;

		let investmentAmmount = investment.amount;

		let previousInvestment = 0;

		for (let index = 1; index <= ageLimit - age; index++) {
			const reinvestRate = annualIncreasePercent && index > 1 ? 1 + annualIncreasePercent / 100 : 1;
			let reinvestment: number = 0;
			const investmentAmount = calculerAugmentationInvestissement(
				monthlyInvestment,
				index,
				annualIncreasePercent
			);

			if (!(investment.investmentCap && previousInvestment >= investment.investmentCap)) {
				previousInvestment += round(investmentAmount * (investment.investmentPercent / 100) * 12);

				if (investment.investmentCap && previousInvestment > investment.investmentCap) {
					const difference = previousInvestment - investment.investmentCap;
					previousInvestment = investment.investmentCap;
					reinvestment = difference;
				} else {
					reinvestment = round(investmentAmount * (investment.investmentPercent / 100) * 12);
				}
			}

			// if (index === 2) {
			// 	console.log(currentAmount);
			// 	console.log(
			// 		`${currentAmount} * (1 + ${investment.yieldPerYear} / 100) + ${monthlyInvestment} * ${
			// 			investment.investmentPercent / 100
			// 		} * 12`
			// 	);
			// 	console.log(
			// 		4200 * (1 + investment.yieldPerYear / 100) +
			// 			monthlyInvestment * (investment.investmentPercent / 100) * 12
			// 	);
			// }

			currentAmount =
				currentAmount * (1 + 6 / 100) +
				monthlyInvestment * (investment.investmentPercent / 100) * 12;

			// currentAmount = round(currentAmount * (1 + investment.yieldPerYear / 100)) + reinvestment;
			investmentAmmount += reinvestment;

			amounts.push(currentAmount);
		}
		// const array = [0, 4200, 8652, 13371.12, 18373.3872, 23675.790432];

		// array.forEach((value, index) => {
		// 	if (value !== amounts[index]) {
		// 		console.log('wrong value', index, value, amounts[index]);
		// 	}
		// });

		return {
			name: investment.name,
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: amounts
		};
	});

	let chart: any;

	// charts
	onMount(() => {
		// Initialize the echarts instance based on the prepared dom
		var myChart = echarts.init(chart);

		// Specify the configuration items and data for the chart
		var option = {
			tooltip: {
				trigger: 'axis'
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: legend
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: data
		};
		// // Display the chart using the configuration items and data just specified.
		myChart.setOption(option);
	});
</script>

<h2>Situation</h2>
<form>
	<label for="age">Age:</label>
	<input type="number" id="age" bind:value={age} />

	<label for="monthlyInvestment">Montant investi mensuellement:</label>
	<input type="number" id="monthlyInvestment" bind:value={monthlyInvestment} />

	<label for="annualIncreasePercent">Pourcentage d'évolution annuel:</label>
	<input type="number" id="annualIncreasePercent" bind:value={annualIncreasePercent} />

	<label for="investmentStopAge">Age d'arrêt des investissements:</label>
	<input type="number" id="investmentStopAge" bind:value={investmentStopAge} />
</form>

<h2>Investissements</h2>
<form on:submit|preventDefault={createInvestment}>
	<label for="name">Nom :</label>
	<input type="text" id="name" bind:value={name} />

	<label for="yieldPerYear">Rendement annuel :</label>
	<input type="number" id="yieldPerYear" bind:value={yieldPerYear} />

	<label for="investmentPercent">Pourcentage d'investissement :</label>
	<input type="number" id="investmentPercent" bind:value={investmentPercent} />

	<label for="investmentCap">Plafond à investir :</label>
	<input type="number" id="investmentCap" bind:value={investmentCap} />

	<input type="submit" value="Créer" />
</form>

<h2>Liste des investissements</h2>
<ul>
	{#each investments as investment}
		<li>
			{investment.name} -{investment.yieldPerYear}
			{investment.investmentPercent ? ' - ' + investment.investmentPercent + '%' : ''}
			{investment.investmentCap ? ' - ' + investment.investmentCap : ''}
		</li>
	{/each}
</ul>

<div bind:this={chart} style="width: 1200px;height:400px;" />

<style>
	form {
		margin-bottom: 20px;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	label {
		display: block;
		margin-bottom: 8px;
	}

	input[type='submit'] {
		margin-top: 12px;
		padding: 8px 16px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	input[type='submit']:hover {
		background-color: #0056b3;
	}
</style>
