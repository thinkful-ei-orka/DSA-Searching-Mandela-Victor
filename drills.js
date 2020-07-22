// 1. How many searches?
// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 
// and using the recursive binary search algorithm, identify 
// the sequence of numbers that each recursive call will 
// search to try and find 8.



// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 
// and using the recursive binary search algorithm, identify 
// the sequence of numbers that each recursive call will 
// search to try and find 16.



// 3. Find a book
// Imagine you are looking for a book in a library with a Dewey Decimal index. 
// How would you go about it? Can you express this process as a search algorithm? 
// Implement your algorithm to find a book whose Dewey and book title is provided.

function bookFinder(dewey, title, library, start = 0, end = library.length - 1) {
     if (start > end) {
          return -1
     }

     const index = Math.floor((start + end) / 2);
     const book = library[index];

     if(parseFloat(book.dewey) === dewey) {
          if(book.title === title) {
               return index
          }
          return -1
     }
     else if (parseFloat(book.dewey) < dewey) {
          return bookFinder(dewey, title, library, index + 1, end)
     }
     else if (parseFloat(book.dewey) > dewey) {
          return bookFinder(dewey, title, library, start, index - 1)
     }
}

// 4. Searching in a BST
// ** No coding is needed for these drills**. 
// Once you have answered it, you can then code the tree and implement the traversal to see if your answer is correct.

// 1) Given a binary search tree whose in-order and pre-order traversals are respectively 
// 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. 
// What would be its postorder traversal?

// 2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. 
// What is its pre-order traversal?