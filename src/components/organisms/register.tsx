type Props = {};

const RegisterForm = (props: Props) => {
  return (
    <form>
      <div>
        <label>
          <input name='firstName' type='text' placeholder='First Name' />
        </label>
      </div>

      <div>
        <label>
          <input name='lastName' type='text' placeholder='Last Name' />
        </label>
      </div>

      <div>
        <label>
          <input name='email' type='email' placeholder='Email Address' />
        </label>
      </div>

      <div>
        <label>
          <input name='password' type='password' placeholder='Password' />
        </label>
      </div>

      <div>
        <label>
          <input
            name='countersign'
            type='password'
            placeholder='Repeat Password'
          />
        </label>
      </div>
    </form>
  );
};

export { RegisterForm };
