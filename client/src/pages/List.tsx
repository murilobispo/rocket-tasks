import { useParams } from 'react-router'

function ListPage(){
	const { id } = useParams()

	return(
		<h1>{id}</h1>
	)
}

export default ListPage