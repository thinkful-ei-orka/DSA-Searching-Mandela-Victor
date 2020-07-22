// 1. How many searches?
// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 
// and using the recursive binary search algorithm, identify 
// the sequence of numbers that each recursive call will 
// search to try and find 8.

// First the algorithm checks 11, which is greater than 8, so the end index is set to 3.
// Then it checks 5, which is less than 8, so the start index is set to 2.
// Then it checks 6, which is also less than 8, so start index is 3.
// Finally it checks 8, which is equal, so it returns index 3

// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 
// and using the recursive binary search algorithm, identify 
// the sequence of numbers that each recursive call will 
// search to try and find 16.

// First it checks 11, which is less than 16, so the start index is set to 5.
// Then it checks 14, which is less than 16, so the start index is set to 7.
// Then it checks 17, which is more than 16, so the end index is set to 7.
// Then it checks, 15, which is less than 16, so the start index is set to 8.
// The start index of 8 is less than the end index of 7, so the algorithm returns -1.

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
// 14 19 15 27 25 79 90 91 89 35

//        35
//      /    \
//     25     89
//    /  \   /  \
//   15  27 79  91
//  /  \       /
// 14  19     90

// 2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. 
// What is its pre-order traversal?
// 8 6 5 7 10 9 11

//        8
//      /   \
//     6     10
//    / \    /  \
//   5   7   9  11