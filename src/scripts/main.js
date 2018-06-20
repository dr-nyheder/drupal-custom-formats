require('../styles/styles.scss');
require('../styles/quicksettings_tiny.scss');
import CodeGenerator from './components/code-generator/code-generator';
function init() {
    const cogen = new CodeGenerator();
}
document.addEventListener('DOMContentLoaded', () => {
    init(); // Udkommenteres til launch i webdok, da vi ikke får event dér
});

