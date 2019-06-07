import { plans } from '../config';

export default id => plans.find(plan => plan.id === id);
