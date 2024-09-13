import React, { Component } from 'react';
import News from "./News";

class UserPreferences extends Component {
    constructor() {
        super();
        this.state = {
            selectedCategories: [],
            val: "",
        };
    }

    // Function to handle changes in category selections
    handleCategoryChange = (category) => {
        const updatedCategories = [...this.state.selectedCategories];

        if (updatedCategories.includes(category)) {
            // If the category is already selected, remove it
            updatedCategories.splice(updatedCategories.indexOf(category), 1);
        } else {
            // If the category is not selected, add it
            updatedCategories.push(category);
        }

        // Update the state with the new selectedCategories array
        this.setState({ selectedCategories: updatedCategories });
    }

    // Function to handle form submission and update the val state variable
    handleSubmit = (e) => {
        e.preventDefault();
        const selectedCategoriesString = this.state.selectedCategories.map(category => category.toLowerCase()).join('&');
        this.setState({ val: selectedCategoriesString });
    }

    // Ensure that the News component re-renders when the category prop changes
    componentDidUpdate(prevProps, prevState) {
        if (prevState.val !== this.state.val) {
            // You can add any logic here to handle updates when category changes
        }
    }

    render() {
        const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];
        return (
            <div>
                <form>
                    <h2>Select Your Favorite Categories:</h2>
                    {categories.map((category) => (
                        <div key={category}>
                            <label className='form-control my-2'>
                                <input
                                    type="checkbox"
                                    value={category}
                                    checked={this.state.selectedCategories.includes(category)}
                                    onChange={() => this.handleCategoryChange(category)}
                                />
                                {category}
                            </label>
                        </div>
                    ))}
                    <button className='btn btn-warning my-2' onClick={this.handleSubmit}>Save Preferences</button>
                </form>
                <p>{this.state.val}</p>
                <News category={this.state.val} />
            </div>
        );
    }
}

export default UserPreferences;
