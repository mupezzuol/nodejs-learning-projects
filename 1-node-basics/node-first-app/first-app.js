const url = 'https://jsonplaceholder.typicode.com/users';

fetch(url)
    .then(response => response.json())
    .then( responseJson => {
        responseJson.map( user => {
            console.log(user.name);
        });
    } )
    .catch(error => {
        console.log('Ops!' + error);
    });

// const fetchData = () => {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('1');
//         resolve('Done!');
//         console.log('2');
//         reject('Reject!');
//         console.log('3');
//     }, 1500);
//   });
//   return promise;
// };

// setTimeout(() => {
//     console.log('Timer is done!');

//     fetchData()
//     .then( (resolve) => {
//         console.log('Resolve Value: ' + resolve);
//         return fetchData();
//     })
//     .then(text2 => {
//         console.log('Resolve2 Value2: ' + text2);
//     })
//     .catch( reject => {
//         console.log('Reject Value: ' + reject);
//     })

// }, 2000);



// console.log('Hello!');
// console.log('Hi!');