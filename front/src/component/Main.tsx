import "./Main.style.css";
import BookList from "./BookList";
import { useEffect, useState } from "react";
import { Book } from "./Book";
import axios from "axios";
import { PageEnum } from "./Enum";
import AddBook from "./AddBook";
import AddAuthor from "./AddAuthor";
import SearchBookList from "./SearchBookList";
import EditBook from "./EditBook";
import TestAddSuccess from "./TestAddSuccess";
import Button from '@mui/material/Button';

const Main = () => {
  // set state to function call 
    const [booklist, setBookList] = useState([] as Book[]);
    const [updateid, setupdateid] = useState("")
    const [searchbooklist, setsearchbooklist] = useState([] as Book[]);
    const [searchdata, setsearchdata] = useState("");
    const [showAddBookPage, setshowAddBookPage] = useState(PageEnum.showlist);
    const addBookMethod = () => {
        setshowAddBookPage(PageEnum.showaddbook);
    };
    const addAuthorMethod = () => {
        setshowAddBookPage(PageEnum.showaddauthor);
    };
   /* Used to get the data from the server. */
    useEffect(() => {
        axios.get("http://localhost:3000/books").then((res) => {
            setBookList(res.data);
            let jsonArray = res.data;
            // Sort the data
            jsonArray.sort((a: any, b: any) => a.title.localeCompare(b.name));
            console.log("=========");
            console.log(jsonArray);
        });
    }, [showAddBookPage]);
    const backShowListPagh = () => {
        setshowAddBookPage(PageEnum.showlist);
    };
    const deleteShowListPage = ()=>{
        axios.get("http://localhost:3000/books").then((res) => {
            setBookList(res.data);
            let jsonArray = res.data;
            // Sort the data
            jsonArray.sort((a: any, b: any) => a.title.localeCompare(b.name));
            console.log("=========");
            console.log(jsonArray);
        });
  }
    /**
     * It sets the showAddBookPage to showsearchbook
     */
    const SearchBookMethod = () => {
        setshowAddBookPage(PageEnum.showsearchbook);
    };

  const TestBookAddData =()=>{
    setshowAddBookPage(PageEnum.showtestBookadd)
  }
    const backEditBookPage= (id:string)=>{
    setupdateid(id)
     setshowAddBookPage(PageEnum.shwoeditbook)
  }
    const onChnageSetSearchData = (e: any) => {
        setsearchdata(e.target.value);
    };
    /**
     * The above function is used to search the book by genre.
     */
    const searchAxios = () => {
        axios
            .get("http://localhost:3000/genrebook?genre=" + searchdata)
            .then((res) => {
                setsearchbooklist(res.data);
                let jsonArray = res.data;
                // Sort the data
                jsonArray.sort((a: any, b: any) =>
                    a.title.localeCompare(b.name)
                );
                console.log("=========");
                console.log(jsonArray);
            });
    };
    return (
        <>
            <article className="main-class">
                <header>
                    <h1>
                        React Searrch insert book Insert Author , Book list
                        ,simple application
                    </h1>
                </header>
            </article>
            <section className="content">
                {showAddBookPage === PageEnum.showlist && (
                    <>
                        <Button 
                            variant="contained"
                            color="success"
                            onClick={addBookMethod}
                            value="Add book"
            >
                      Add Book </Button>
                        <br></br>
                        
                        <Button 
                            variant="contained"
                            color="success"
                            onClick={addAuthorMethod}
                            value="Add book"
            >
                      Add Author</Button>
                        <br></br>
                        <Button 
                            variant="contained"
                            color="success"
                            onClick={SearchBookMethod}
                            value="Add book"
            >
                      Seach Book </Button>
                        <br></br>
                        <Button 
                            variant="contained"
                            color="success"
                            onClick={TestBookAddData}
                            value="Add book"
            >
                      Test add book data</Button>
                        <br></br>
                        <BookList booklist={booklist} deletebook={deleteShowListPage} editBook={backEditBookPage}/>
                    </>
                )}
                {showAddBookPage === PageEnum.showsearchbook && (
                    <>
                        <label>Search Book Genre = </label>
                        <input
                            type="text"
                            value={searchdata}
                            onChange={onChnageSetSearchData}
                        />
                        <input
                            type="button"
                            value="Search Book"
                        />
                        <SearchBookList
                            booklist={searchbooklist}
                            backShowListPagh={backShowListPagh}
                        />
                    </>
                )}
                {showAddBookPage === PageEnum.showaddbook && (
                    <AddBook backShowListPagh={backShowListPagh} />
                )}
                {showAddBookPage == PageEnum.showaddauthor && (
                    <AddAuthor backShowListPagh={backShowListPagh} />
                )}
                {showAddBookPage == PageEnum.shwoeditbook && (
                <EditBook id={updateid} backShowListPagh={backShowListPagh }/>
                )}
                {showAddBookPage == PageEnum.showtestBookadd&& (
                <TestAddSuccess backShowListPagh={backShowListPagh}/>
                )}
            </section>
        </>
    );
};
export default Main;
