//  Однин из подключаемых компонентов

import React from "react"

class AddUser extends React.Component {
	userAdd = {} // Временный объект для хранения данных формы перед отправкой

	constructor( props ) {
		super( props )

		// Инициализация состояния компонента
		this.state = {
			name: this.props.user ? this.props.user.name : "", // Если передан существующий пользователь - берем его имя, иначе пустую строку
			username: this.props.user ? this.props.user.username : "",
			email: this.props.user ? this.props.user.email : "",
			// Для адреса проверяем вложенность: сначала наличие user, потом address
			street: this.props.user && this.props.user.address ? this.props.user.address.street : "",
			city: this.props.user && this.props.user.address ? this.props.user.address.city : "",
			suite: this.props.user && this.props.user.address ? this.props.user.address.suite : "",
			zipcode: this.props.user && this.props.user.address ? this.props.user.address.zipcode : "",
			isHappy: this.props.user ? this.props.user.isHappy : false // Чекбокс, по умолчанию false
		}
	}

	render() {
		return (
			<form ref={( el ) => this.myForm = el}> {/* Сохраняем ссылку на DOM-элемент формы */}
				<h4>Имя, Фамилия, Мыло</h4>

				{/* Поле имени */}
				<input
					placeholder="Имя"
					value={this.state.name}
					onChange={( e ) => this.setState( { name: e.target.value } )} // Обновляем state при каждом изменении
				/>

				{/* Поле никнейма */}
				<input
					placeholder="Никнейм"
					value={this.state.username}
					onChange={( e ) => this.setState( { username: e.target.value } )}
				/>

				{/* Поле email с типом email для валидации */}
				<input
					placeholder="Емайл"
					type="email"
					value={this.state.email}
					onChange={( e ) => this.setState( { email: e.target.value } )}
				/>

				{/* ✅ Раздельные поля для адреса */}
				<h4>Адрес:</h4>

				{/* Улица */}
				<input
					placeholder="Улица"
					value={this.state.street}
					onChange={( e ) => this.setState( { street: e.target.value } )}
				/>

				{/* Город */}
				<input
					placeholder="Город"
					value={this.state.city}
					onChange={( e ) => this.setState( { city: e.target.value } )}
				/>

				{/* Квартира/офис */}
				<input
					placeholder="Квартира/Офис"
					value={this.state.suite}
					onChange={( e ) => this.setState( { suite: e.target.value } )}
				/>

				{/* Почтовый индекс */}
				<input
					placeholder="Почтовый индекс"
					value={this.state.zipcode}
					onChange={( e ) => this.setState( { zipcode: e.target.value } )}
				/>

				{/* Чекбокс "Счастлив?" */}
				<label htmlFor="isHappy">
					<input
						type="checkbox"
						id="isHappy"
						checked={this.state.isHappy} // Связываем со state
						onChange={( e ) => this.setState( { isHappy: e.target.checked } )} // Обновляем при изменении
					/>
					Счастлив?
				</label>

				{/* Кнопка отправки формы */}
				<button type="button" onClick={() => {
					// Сбрасываем форму (очищаем поля)
					this.myForm.reset()

					// ✅ Создаем объект пользователя с правильной структурой
					this.userAdd = {
						name: this.state.name,
						username: this.state.username,
						email: this.state.email,
						address: {
							street: this.state.street,
							city: this.state.city,
							suite: this.state.suite,
							zipcode: this.state.zipcode,
							geo: { // Геоданные по умолчанию
								lat: "0",
								lng: "0"
							}
						},
						isHappy: this.state.isHappy,
					}

					// Если редактируем существующего пользователя
					if ( this.props.user ) {
						this.userAdd.id = this.props.user.id // Сохраняем ID

						// ✅ Сохраняем существующие геоданные если они есть
						if ( this.props.user.address && this.props.user.address.geo ) {
							this.userAdd.address.geo = this.props.user.address.geo
						}
					}

					// Передаем данные в родительский компонент
					this.props.onAdd( this.userAdd )

					// ✅ Очищаем state после отправки (только при добавлении нового пользователя)
					if ( !this.props.user ) {
						this.setState( {
							name: "",
							username: "",
							email: "",
							street: "",
							city: "",
							suite: "",
							zipcode: "",
							isHappy: false
						} )
					}
				}}>
					{/* Динамический текст кнопки */}
					{this.props.user ? 'Обновить' : 'Добавить'}
				</button>
			</form>
		)
	}
}

export default AddUser


// Ключевые особенности компонента:
// Универсальность: Компонент работает в двух режимах - добавление нового пользователя и редактирование существующего

// Управляемые компоненты: Все поля формы связаны со state компонента

// Структура данных: Правильно формирует объект пользователя с вложенным адресом

// Состояние по умолчанию: При добавлении нового пользователя форма инициализируется пустыми значениями

// Сохранение данных: При редактировании сохраняет ID и существующие геоданные

// Очистка формы: После отправки форма очищается соответствующим образом для каждого режима