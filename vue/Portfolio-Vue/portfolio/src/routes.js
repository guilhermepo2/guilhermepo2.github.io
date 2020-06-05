import Home from './components/Home.vue'
import PortfolioEntry from './components/PortfolioEntry.vue'

export const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/entry', name: 'portfolio-entry', component: PortfolioEntry, props: true }
];