export const AdminFooterComponent = () =>{
    let date =  new Date();
    let year = date.getFullYear();
    return(
        <>
            <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website {year}</div>
                        </div>
                    </div>
                </footer>
        </>
    )
}

