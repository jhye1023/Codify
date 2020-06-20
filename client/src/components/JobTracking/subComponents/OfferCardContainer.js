import React, { useState, useEffect } from 'react';
import { getOffers, updateOffer, addOffer } from '../../../utils/API';
import { useParams } from 'react-router-dom';
import OfferCard from './OfferCard';
import M from 'materialize-css';
import _ from 'lodash';

const debouncedUpdateOffer = _.debounce(updateOffer, 500);

function OfferCardContainer() {
	const [offers, setOffers] = useState([{ salary: '', bonus: '', benefits: '' }]);

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			let retrievedOffers = await getOffers(id);
			if (retrievedOffers.length > 0) setOffers(retrievedOffers);
		})();
	}, []);

	const convertMoneyToNumber = (money) => {
		if (typeof money === 'string') {
			console.log('string ' + money);
			return money.replace('$ ', '').split(',').join('');
		} else {
			console.log('number ' + money);
			return money;
		}
	};

	const handleInputChange = async (event, index, offerId) => {
		let newOffers = [...offers];
		let shortName = event.target.name;
		newOffers[index][shortName] = event.target.value;

		if (offerId) {
			const { date, startDate, salary, bonus, benefits } = newOffers[index];
			const formattedDate = new Date(date);
			const formattedStartDate = new Date(startDate);
			const formattedSalary = convertMoneyToNumber(salary);
			const formattedBonus = convertMoneyToNumber(bonus);
			const formattedOffer = {
				date: formattedDate,
				startDate: formattedStartDate,
				salary: formattedSalary,
				bonus: formattedBonus,
				benefits
			};
			debouncedUpdateOffer(formattedOffer, id, index);
		}
		console.log(newOffers);
		setOffers(newOffers);
	};

	const addOfferField = () => {
		const newOffer = { salary: '', bonus: '', benefits: '' };
		const newOfferArr = [...offers, newOffer];
		setOffers(newOfferArr);
	};

	const addNewOffer = async (index) => {
		const { startDate, date, salary, bonus, benefits } = offers[index];
		console.log({ startDate, date, salary, bonus, benefits });
		if (startDate || date || salary || bonus || benefits) {
			let formattedDate = date && new Date(date);
			let formattedStartDate = startDate && new Date(startDate);
			console.log(salary);
			let formattedSalary = convertMoneyToNumber(salary);
			console.log(bonus);
			let formattedBonus = convertMoneyToNumber(bonus);
			console.log(formattedSalary);
			const formattedOffer = {
				date: formattedDate,
				startDate: formattedStartDate,
				salary: formattedSalary,
				bonus: formattedBonus,
				benefits
			};

			await addOffer(formattedOffer, id);

			let newOffers = await getOffers(id);
			setOffers(newOffers);
		} else {
			M.toast({ html: 'Please fill out at least one field' });
		}
	};

	return (
		<div className="col s12 m12 l6">
			<div className="row card-image">
				<div className="col s6 card-title">Offers</div>
				<div className="col s6">
					<div className="card-button" id="new-contact-btn" onClick={addOfferField}>
						Add Offer
					</div>
				</div>
			</div>
			{offers.map((offer, index) => {
				const { startDate, date, salary, bonus, benefits } = offer;
				return (
					<OfferCard
						key={offer._id || index}
						startDate={startDate}
						date={date}
						salary={salary}
						bonus={bonus}
						benefits={benefits}
						index={index}
						_id={offer._id}
						handleInputChange={handleInputChange}
						addNewOffer={addNewOffer}
					/>
				);
			})}
		</div>
	);
}

export default OfferCardContainer;
