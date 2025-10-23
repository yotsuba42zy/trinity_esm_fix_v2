import { startRouter, register } from './router.js';
import { page as Diagnose } from './pages/diagnose.js';
import { page as Library } from './pages/library.js';
import { page as Compat } from './pages/compat.js';
import { page as About } from './pages/about.js';
import { page as Team } from './pages/team.js';

const root = document.getElementById('app');
register('/diagnose', Diagnose);
register('/team', Team);
register('/library', Library);
register('/compat', Compat);
register('/about', About);
startRouter(root);
