import { Form, Button, Container } from 'react-bootstrap'
import Advice from '../../api/quote'

const GoalForm = (props) => {
    
    const { goal, handleChange, handleSubmit, heading, } = props

    return (
        <div>
        <Container className='justify-content-center' style={{ background: 'linear-gradient(to bottom right, #d7e4f5, #f7d9aa)', height: '100vh' }}>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '10px' }}>
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
                        value={goal.what}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Why:</Form.Label>
                    <Form.Control
                        placeholder='What is your motivation?'
                        name='why'
                        id='why'
                        value={goal.why}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>By When (optional):</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Set a deadline for your goal (optional)'
                        name='whenEnd'
                        id='whenEnd'
                        value={goal.whenEnd}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label='Would you like this goal to be viewable by other users?'
                        name='isPublic'
                        defaultChecked={goal.isPublic}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>
        </Container>
        <br/>
        <div>
            <h5>Your motivational quote of the moment:</h5>
            <Advice/>
        </div>
      </div>
    )
}

export default GoalForm
