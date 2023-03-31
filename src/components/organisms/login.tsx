type Props = {};

const LoginForm = (props: Props) => {
  return (
    <form>
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
    </form>
  );
};

export { LoginForm };
