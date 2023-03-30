type Props = {};

const RegisterForm = (props: Props) => {
  return (
    <form>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <input id='firstName' type='text' placeholder='Email Address' />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name</label>
        <input id='lastName' type='text' placeholder='' />
      </div>
      <div>
        <label htmlFor='email'>Email Address</label>
        <input id='email' type='email' placeholder='' />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' placeholder='Email Address' />
      </div>

      <div>
        <label htmlFor='countersign'>Repeat Password</label>
        <input id='countersign' type='password' placeholder='Email Address' />
      </div>
    </form>
  );
};

export { RegisterForm };
