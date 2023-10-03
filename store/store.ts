import {hookstate} from '@hookstate/core';


const buttonStore = hookstate({
    
    buttons: [
      {
        type: 'operation',
        iconName: 'c',
        operation: 'c',
        iconLibrary: 'FontAwesome6',
      },
      {
        type: 'operation',
        iconName: 'percent',
        operation: '%',
        iconLibrary: 'FontAwesome6',
      },
      {
        type: 'operation',
        iconName: 'backspace-outline',
        operation: 'bckspc',
        iconLibrary: 'Ionicons',
      },
      {
        type: 'operation',
        iconName: 'divide',
        operation: '/',
        iconLibrary: 'FontAwesome6',
      },
      {type: 'number', label: '7', value: 7},
      {type: 'number', label: '8', value: 8},
      {type: 'number', label: '9', value: 9},
      {
        type: 'operation',
        iconName: 'xmark',
        operation: '*',
        iconLibrary: 'FontAwesome6',
      },
      {type: 'number', label: '4', value: 4},
      {type: 'number', label: '5', value: 5},
      {type: 'number', label: '6', value: 6},
      {
        type: 'operation',
        iconName: 'minus',
        operation: '-',
        iconLibrary: 'FontAwesome6',
      },
      
      {type: 'number', label: '1', value: 1},
      {type: 'number', label: '2', value: 2},
      {type: 'number', label: '3', value: 3},
      {
        type: 'operation',
        iconName: 'plus',
        operation: '+',
        iconLibrary: 'FontAwesome6',
      },
      
      {type: 'number', label: '00'},
      {type: 'number', label: '0', value: 0},
      {type: 'number', label: '.'},
      {
        type: 'operation',
        iconName: 'equals',
        operation: '=',
        iconLibrary: 'FontAwesome6',
      },
],
      equalsPressed: false, 
      sqrt :{
        type: "operation",
        operation: "√"
      }
});

export default buttonStore;