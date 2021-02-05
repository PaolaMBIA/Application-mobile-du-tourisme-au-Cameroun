import React from 'react';

export const post = [
    {
        id: 1,
        pictureProfil: '../images/image.jpeg',
        pseudo: "Kimy",
        picturePost: ['https://i.pinimg.com/originals/22/61/09/2261090ee055b3abe9658228f5a535c7.jpg'],
        title: "Limbe",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .",
        comments: [{
            pseudoComment: "Bea",
            text: "super endroit",
            timeStamp: "20/06/2020"
        }],
        numberComments: 1,
        likes: 6,
        timeStamp: "20/05/2020"
    },
    {
        id: 2,
        pictureProfil: '../images/image.jpeg',
        pseudo: "Bea",
        picturePost: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Les_Gorges_de_Kola2.jpg/1200px-Les_Gorges_de_Kola2.jpg'],
        title: "Les gorges de Kola",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        comments: [{
            pseudoComment: "Kimy",
            text: "facile d'accès?",
            timeStamp: "20/06/2020"
        }, {
            pseudoComment: "Bea",
            text: "oui",
            timeStamp: "20/06/2020"
        }],
        numberComments: 2,
        likes: 3,
        timeStamp: "20/06/2020"
    },
    {
        id: 3,
        pictureProfil: '../images/image.jpeg',
        pseudo: "Christy",
        picturePost: ["https://www.editions2015.com/cameroun/wp-content/uploads/2015/05/centre-touristique-nkolandom.jpg"],
        title: "Centre touristique de Nkolandom",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
        comments: [{
            pseudoComment: "Evrard",
            text: "comment tu as découvert?",
            timeStamp: "20/06/2020"
        }],
        numberComments: 1,
        likes: 5,
        timeStamp: "20/06/2020"
    },
    {
        id: 4,
        pictureProfil: '../images/image.jpeg',
        pseudo: "Evrard",
        picturePost: ['https://cf.bstatic.com/images/hotel/max1024x768/237/237412687.jpg'],
        title: "Kribi",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        comments: [],
        numberComments: 0,
        likes: 0,
        timeStamp: "20/06/2020"
    },
    {
        id: 5,
        pictureProfil: '../images/image.jpeg',
        pseudo: "Cherif",
        picturePost: ['https://destination-cameroun.com/wp-content/uploads/2018/07/Les-chutes-dekom-Cameroun.jpg', 'https://www.editions2015.com/cameroun/wp-content/uploads/2015/05/chutes_metche.jpg'],
        title: "Les chutes d'Ekom",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        comments: [],
        numberComments: 0,
        likes: 0,
        timeStamp: "20/06/2020"
    }
]