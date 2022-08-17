import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const Oauth = () => {
  const { VITE_CLIENT_ID } = import.meta.env;
  const authorize_uri = "https://github.com/login/oauth/authorize";
  const redirect_uri = "http://localhost:3000/oauth/redirect";

  const githubOauthHref = `${authorize_uri}?client_id=${VITE_CLIENT_ID}&redirect_uri=${redirect_uri}`;

  return (
    <div className="mb-2">
      <Button
        type="text"
        icon={<GithubOutlined style={{ fontSize: 28 }} />}
        href={githubOauthHref}
      />
    </div>
  );
};

export default Oauth;
