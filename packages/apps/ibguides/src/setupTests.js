import 'jest-enzyme';
// import htmlSerializer from 'jest-serializer-html';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// expect.addSnapshotSerializer(htmlSerializer);

configure({ adapter: new Adapter() });
