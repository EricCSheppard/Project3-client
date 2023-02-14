import { Form, Button, Container } from 'react-bootstrap'

const GoalForm = (props) => {
    
    const { goal, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Select a category:</Form.Label>
                    <Form.Select
                        aria-label='category'
                        name='type'
                        defaultValue={goal.type}
                        onChange={handleChange}
                    >
                    <option>Please Select a Category</option>
                    <option value='Finance'>Finance</option>
                    <option value='Lifestyle'>Lifestyle</option>
                    <option value='Health-Fitness'>Health and Fitness</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>What:</Form.Label>
                    <Form.Control
                        placeholder='What do you want to accomplish?'
                        name='what'
                        id='what'
                        value={ goal.what }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Why:</Form.Label>
                    <Form.Control
                        placeholder='What is your motivation?'
                        name='why'
                        id='why'
                        value={ goal.why }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Deadline:</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Set a deadline for your goal (optional)'
                        name='whenEnd'
                        id='whenEnd'
                        value={ goal.whenEnd }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label='Would you like this goal to be viewable by other users?'
                        name='isPublic'
                        defaultChecked={ goal.isPublic }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>

        </Container>
    )
}

export default GoalForm