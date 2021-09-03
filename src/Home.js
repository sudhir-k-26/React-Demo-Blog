import BlogList from './BlogList';
import useFetch from './useFetch';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
const Home = () => {    

   const {data:blogs, isLoading, error} = useFetch("http://localhost:8000/blogs");
   const [pageNumber, setPageNumber] = useState(0);
   const blogsPerPage = 5;
   const pagesVisited = pageNumber * blogsPerPage;
  
   const pageCount = (blogs, blogsPerPage) =>{
     return Math.ceil(blogs.length / blogsPerPage);
   }
   const changePage = ({selected}) =>{

    setPageNumber(selected)

   }
    return (
        <div>
          {error && <div>{error}</div>}
          {isLoading && <div>Loading...</div>}
          {blogs && <BlogList blogs={blogs.slice(pagesVisited,pagesVisited+blogsPerPage)} title="All Blogs" />} 
         {blogs && <ReactPaginate 

          previousLabel={"<< Previous"}
          nextLabel = {">> Next"}
          pageCount= {pageCount(blogs, blogsPerPage)}
          onPageChange = {changePage}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeLinkClassName={"active"}
          disabledClassName={"disabled"}
          />}
        </div>
    )
}

export default Home;
