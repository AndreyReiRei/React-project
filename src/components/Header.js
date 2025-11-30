//  Однин из подключаемых компонентов

import React from "react"
// Сделаем тоже самое только через переменные

// Классовый компонент Header, наследуемый от React.Component
class Header extends React.Component {
	render() {
		return (
			// Элемент header с CSS-классом "header" для стилизации. Все содержимое будет отображаться БЕЗ пробелов между элементами.

			<header className="header">{this.props.title}
			</header>
		)
	}
}

export default Header


