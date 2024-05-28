import { connect } from 'react-redux';
import ScryfallSearch from './components/ScryfallSearch/ScryfallSearch';
import { mapStateToProps } from './utils/Utils';

function App() {
  return (
    <div>
      <ScryfallSearch />
    </div>
  );
}

export default connect(mapStateToProps)(App);
