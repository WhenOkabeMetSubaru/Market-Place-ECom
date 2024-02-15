export const Tabs = ({ children, name, tab }) =>
{
    return (

        tab == name ? <section className="w-full" children={ children } /> : <></>
    )
}