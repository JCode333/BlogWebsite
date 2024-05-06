import express from "express";
import Post from '../models/Post.js';
const router = express.Router(); //Get the router from express to be able to use this file as the router file


/**
 * Get /
 * Home
*/ 

router.get('', async (req, res) => {
    

    try{

        //How to pass data to ejs file
    const locals = {
        title: "NodeJs Blog",
        decription: "Simple Blog crated with Nodejs and ModgleDB."
    }

    let perPage = 10; //how may block posts we want to display per page
    let page = req.query.page || 1; //set page and if there isnt another page then set to page 1

    const data = await Post.aggregate([ {$sort: { createdAt: -1} }]) //sort the results by the oldest being at the top
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments({}); //Query how may block posts we have
    const nextPage = parseInt(page) +1; //Convert number into an integer
    const hasNextPage = nextPage <= Math.ceil(count / perPage)

    res.render("index", {
        locals, 
        data,
        current: page, 
        nextPage : hasNextPage ? nextPage : null,
        currentRoute: '/'
    });

    }   catch(error){
        console.log(error)
    }
});

//Without the pagination

// router.get('', async (req, res) => {
//     //How to pass data to ejs file
//     const locals = {
//         title: "NodeJs Blog",
//         decription: "Simple Blog crated with Nodejs and ModgleDB."
//     }

//     try{
//         const data = await Post.find(); //find all the posts
//         res.render("index", {locals, data}); // Rendering the home page and pass data {locals and data}
//     }catch(error){
//         console.log(error)
//     }
// });

/**
 * GET /
 * Post:id
*/ 

router.get('/post/:id', async (req, res) => {
    try{
        //How to pass data to ejs file

        let slug = req.params.id; // How we grab the id

        const data = await Post.findById({_id: slug}); //find all the posts

        const locals = {
            title: data.title,
            decription: "Simple Blog crated with Nodejs and ModgleDB.",
            }
        
        res.render("post", {
            locals,
            data, 
            currentRoute:`/post/${slug}`
            }); // Rendering the home page and pass data {locals and data}
    }catch(error){
        console.log(error)
    }
});

/**
 * POST /
 * Post:id
*/ 

router.post('/search', async (req, res) => {
    try{
        const locals = {
            title: "Search",
            decription: "Simple Blog crated with Nodejs and ModgleDB."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        console.log(searchTerm);

        const data = await Post.find({
            $or: [
                { title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                { body: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
            ]
        }); //find all the posts
        res.render("search", {
            data,
            locals
        }); // Rendering the home page and pass data {locals and data}
    }catch(error){
        console.log(error)
    }
});


router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    }); 
});

export default router; //Exporting the router object to be used by other parts of the application





// function insertPostData (){
//     Post.insertMany([
//         {
//             title: "Building APIs with Node.js",
//             body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//         },
//         {
//             title: "Deployment of Node.js applications",
//             body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//         },
//         {
//             title: "Authentication and Authorization in Node.js",
//             body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//         },
//         {
//             title: "Understand how to work with MongoDB and Mongoose",
//             body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//         },
//         {
//             title: "build real-time, event-driven applications in Node.js",
//             body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//         },
//         {
//             title: "Discover how to use Express.js",
//             body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//         },
//         {
//             title: "Asynchronous Programming with Node.js",
//             body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//         },
//         {
//             title: "Learn the basics of Node.js and its architecture",
//             body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//         },
//         {
//             title: "NodeJs Limiting Network Traffic",
//             body: "Learn how to limit netowrk traffic."
//         },
//         {
//             title: "Learn Morgan - HTTP Request logger for NodeJs",
//             body: "Learn Morgan."
//         },
//     ])
// }

// Call the insertPostData function to insert initial data when the server starts
// insertPostData();