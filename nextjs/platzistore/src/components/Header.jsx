import React, { useContext, useState } from 'react';
import Menu from '@components/Menu';
import MyOrder from '@containers/MyOrder';
import menu from '@icons/icon_menu.svg';
import logo from '@logos/logo_yard_sale.svg';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import styles from '@styles/Header.module.scss';

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [toggleOrders, setToggleOrders] = useState(false);
    const { state } = useContext(AppContext);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    { toggleOrders && <MyOrder toggleOrders={toggleOrders} setToggleOrders={setToggleOrders} /> }
    return (

        <nav className={styles.Nav}>
            <Image src={menu} alt="menu" className={styles.menu} />
            <div className={styles['navbar-left']}>
                <Image src={logo} alt="logo" className={styles['nav-logo']} />
                <ul>
                    <li>
                        <a href="/">All</a>
                    </li>
                    <li>
                        <a href="/">Clothes</a>
                    </li>
                    <li>
                        <a href="/">Electronics</a>
                    </li>
                    <li>
                        <a href="/">Furnitures</a>
                    </li>
                    <li>
                        <a href="/">Toys</a>
                    </li>
                    <li>
                        <a href="/">Others</a>
                    </li>
                </ul>
            </div>
            <div className={styles['navbar-right']}>
                <ul>
                    <li className={styles['more-clickable-area'], styles['navbar-email'], styles.pointer} onClick={() => toggleMenu()}>
                        platzi@example.com
                    </li>
                    <li
                        // className={styles.['navbar-shopping-cart']}
                        onClick={() => toggleOrder()}
                    >
                        <Image className={styles['more-clickable-area'], styles.pointer} src={shoppingCart} alt="shopping cart" />
                        {state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
                    </li>
                </ul>
            </div>
            {toggle && <Menu />}
            {toggleOrders && <MyOrder toggleOrders={toggleOrders} setToggleOrders={setToggleOrders} />}
        </nav>
    );
}

export default Header;