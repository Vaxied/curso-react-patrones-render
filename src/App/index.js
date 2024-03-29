import React from 'react'
import { useTodos } from './useTodos'
import { TodoHeader } from '../TodoHeader'
import { TodoCounter } from '../TodoCounter'
import { TodoSearch } from '../TodoSearch'
import { TodoList } from '../TodoList'
import { TodoItem } from '../TodoItem'
import { TodosError } from '../TodosError'
import { TodosLoading } from '../TodosLoading'
import { EmptyTodos } from '../EmptyTodos'
import { TodoForm } from '../TodoForm'
import { CreateTodoButton } from '../CreateTodoButton'
import { Modal } from '../Modal'
import { ChangeAlert } from '../ChangeAlert'

function App() {
    const { state, stateUpdaters } = useTodos()

    const {
        error,
        loading,
        completeTodo,
        openModal,
        completedTodos,
        totalTodos,
        searchValue,
        searchedTodos,
    } = state

    const {
        deleteTodo,
        setOpenModal,
        synchronizeTodos,
        addTodo,
        setSearchValue,
    } = stateUpdaters

    return (
        <React.Fragment>
            <TodoHeader>
                <TodoCounter
                    completedTodos={completedTodos}
                    totalTodos={totalTodos}
                    loading={loading}
                />
                <TodoSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    loading={loading}
                />
            </TodoHeader>

            <TodoList
                error={error}
                loading={loading}
                searchedTodos={searchedTodos}
                searchedText={searchValue}
                totalTodos={totalTodos}
                onError={() => <TodosError />}
                onLoading={() => <TodosLoading />}
                onEmptyTodos={() => <EmptyTodos />}
                onEmptySearchResults={(searchedText) => (
                    <p>No hay resultados para {searchedText}</p>
                )}
            >
                {(todo) => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                )}
            </TodoList>

            {!!openModal && (
                <Modal>
                    <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
                </Modal>
            )}

            <CreateTodoButton setOpenModal={setOpenModal} />
            <ChangeAlert synchronize={synchronizeTodos} />
        </React.Fragment>
    )
}

export default App
