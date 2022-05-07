import React from 'react';
import {Carousel} from 'react-bootstrap';
import Image1 from './slideImages/Image (1).png';
import Image2 from './slideImages/Image (2).png';
import Image3 from './slideImages/Image (3).png';
import Image4 from './slideImages/Image (4).png';
import Image5 from './slideImages/Image (5).png';
import Image6 from './slideImages/Image (6).png';
import Image7 from './slideImages/Image (7).png';
import Image9 from './slideImages/Image (9).png';
import Image10 from './slideImages/Image (10).png';
import Image11 from './slideImages/Image (11).png';
import Image12 from './slideImages/Image (12).png';
import Image14 from './slideImages/Image (14).png';



// Images and captions for the slideshow.
const slideshow = [
    {image: Image2, title: 'Use our Network', description: 'Bookstore is for the students by the students.'},
    {image: Image1, title: 'Search Books', description: 'Find the books you need from students like you.'},
    {image: Image6, title: 'Post your Books', description: 'Post the books you no longer need so that it can be passed to others.'},
    {image: Image7, title: 'Post your Requests', description: 'Post the books you need and we will notify you automatically via email.'},
    {image: Image3, title: 'Update Information', description: 'Update your information as you upgrade classes or change your major.'},
    {image: Image5, title: 'Search by Location', description: 'You can even search books by the location of the provider.'},
    {image: Image9, title: 'Pre-ready Prompt', description: 'Use our pre-ready email prompts to send emails.'},
    {image: Image14, title: 'Send Multiple Mails', description: 'Send multiple emails at once.'},
    {image: Image10, title: 'Search The Web', description: 'You can even search various websites for the books you need.'},
    {image: Image11, title: 'Get Hundreds of Options', description: 'Use our web-scraping feature to view the books all at one go.'},
    {image: Image12, title: 'Get Detailed Information', description: 'Get detailed information of all the search entries and then go the respective website directly.'},
    {image: Image4, title: 'Secure Logout', description: 'Once you are done, you can securely log out off the website.'},
]



/**/
/*
SlideShow()
NAME
    SlideShow - Generates and returns the Javascript XML for the slideshow container.
SYNOPSIS
    SlideShow(); 
        No props passed.
DESCRIPTION
    It utlizes react-bootstrap carousel and returns the slideshow for 12 different 
    features each consisting of image and its short description. Each slide lasts 
    for 4.5 seconds.     
RETURNS
    Returns the Javascript XML for slideshow displaying list of features of the application.
*/
/**/
const SlideShow = () => {
    return (
        <>
          <Carousel variant = "dark">

            {/* Slide 1. Bookstore introduction. */}
            <Carousel.Item interval={4500}>
                <img
                  className="d-block w-100"
                  src={slideshow[0].image}
                  alt="a"
                />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[0].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[0].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>

            {/* Slide 2. Search feature. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[1].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[1].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[1].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 3. Posting Books. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[2].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[2].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[2].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 4. Posting Requests. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[3].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[3].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[3].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 5. Updating Information. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[4].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[4].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[4].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 6. Location-wise search. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[5].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[5].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[5].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 7. Email Prompts. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[6].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[6].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[6].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 8. Multiple Emails. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[7].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[7].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[7].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 9. Searching the web. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[8].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[8].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[8].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 10. Multiple options. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[9].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[9].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[9].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 11. Detailed information. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[10].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[10].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[10].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
            
            {/* Slide 12. Secure Logout. */}
            <Carousel.Item interval={4500}>
              <img
                className="d-block w-100"
                src={slideshow[11].image}
                alt="A"
              />
              <Carousel.Caption>
                <h2 style={{ color: 'black' }}>{slideshow[11].title}</h2>
                <h5 style={{ color: 'black' }}>{slideshow[11].description}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </>
  )
};
// SlideShow();



export default SlideShow;
