<!-- src/routes/user.svelte -->
<script lang="ts">
	import { User } from '../../models/User.js';

	let age: number;
	let monthlyInvestment: number;
	let annualIncreasePercent: number;
	let investmentStopAge: number;

	function createUser() {
		const user = new User(age, monthlyInvestment, annualIncreasePercent, investmentStopAge);
	}
</script>

<form on:submit|preventDefault={createUser}>
	<label for="age">Age:</label>
	<input type="number" id="age" bind:value={age} />

	<label for="monthlyInvestment">Montant investi mensuellement:</label>
	<input type="number" id="monthlyInvestment" bind:value={monthlyInvestment} />

	<label for="annualIncreasePercent">Pourcentage d'évolution annuel:</label>
	<input type="number" id="annualIncreasePercent" bind:value={annualIncreasePercent} />

	<label for="investmentStopAge">Age d'arrêt des investissements:</label>
	<input type="number" id="investmentStopAge" bind:value={investmentStopAge} />

	<input type="submit" value="Créer" />
</form>
