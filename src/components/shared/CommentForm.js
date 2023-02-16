import { Form, Button, Container } from 'react-bootstrap'

const CommentForm = (props) => {
    
    const { comment, handleChange, handleSubmit } = props

    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Add a new comment:</Form.Label>
                    <Form.Control
                        placeholder=''
                        name='note'
                        id='what'
                        value={comment.note}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm