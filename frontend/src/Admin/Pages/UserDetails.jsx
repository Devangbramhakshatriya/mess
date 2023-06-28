import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {RiDeleteBin6Line} from "react-icons/ri"

function UserDetails() {
    const [order, setOrder] = useState([])
    const { id } = useParams()

    const date1 = new Date()

    let d = date1.getDate()
    if (d < 10) {
        d = `0${d}`
    }
    let mm = date1.getMonth() + 1
    if (mm < 10) {
        mm = `0${mm}`
    }
    let m = date1.getMonth() + 1
    if (m < 10) {
        m = `0${m}`
    }
    let y = date1.getFullYear()
    let minDate = `${y}-${m}-${d}`
    let filterDate = `${y}-${mm}`

    let obj = {
        // params: {
        //   filter: SearchParams.get('filter'),
        // },
        filter: filterDate
    }

    const handleDate = (val) => {
        let d = +mm + val
        if (d < 10) {
            d = `0${d}`
        }
        filterDate = `${+y}-${d}`
        console.log(filterDate)
        fetchDetals(filterDate)
    }

    const fetchDetals = (date) => {
        fetch(`http://localhost:4500/orders/userorder/${id}?filter=${date}`)
            .then((res) => res.json())
            .then((res) => setOrder(res))
    }
    useEffect(() => {
        fetchDetals(filterDate)
    }, [])

    let q = 0;
    let t = 0;
    order.length > 0 && order.map((e) => {
        q += e.quantity
        t = q * 50
    })

    const handleDelete=(id)=>{
        fetch(`http://localhost:4500/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() =>fetchDetals() )
    }
    return (
        <Box>
            <Navbar />
            <Button onClick={() => handleDate(-1)}>Prev</Button>
            <Button onClick={() => handleDate(0)}>Next</Button>
            <Box overflow="auto">
            <Table>
                <Thead>
                    <Tr>
                        <Th>Sr. No.</Th>
                        <Th>Date</Th>
                        <Th>Time</Th>
                        <Th>Quantity</Th>
                        <Th>Total</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        order.map((el, i) => (
                            <Tr>
                                <Td>{i + 1}</Td>
                                <Td>{el.date}</Td>
                                <Td>{el.time}</Td>
                                <Td>{el.quantity}</Td>
                                <Td>{el.total}</Td>
                                <Td><RiDeleteBin6Line color="red" onClick={()=>handleDelete(el._id)}/></Td>
                            </Tr>
                        ))
                    }
                    <Tr>
                        <Th>Total :-</Th>
                        <Th></Th>
                        <Th></Th>
                        <Th>{q}</Th>
                        <Th>{t}</Th>
                    </Tr>
                </Tbody>
            </Table>
            </Box>
        </Box>
    )
}
export default UserDetails