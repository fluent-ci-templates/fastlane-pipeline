use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_devbox() -> Result<(), Error> {
    let mut ruby_version = dag().get_env("RUBY_VERSION").unwrap_or_default();

    if ruby_version.is_empty() {
        ruby_version = "3.2.2".into();
    }

    dag()
        .devbox()?
        .with_exec(vec!["[ -f devbox.json ] || devbox init"])?
        .with_exec(vec![&format!(
            "grep -q 'ruby' devbox.json || devbox add ruby@{},jdk@17.0.7+7",
            ruby_version
        )])?
        .stdout()?;
    Ok(())
}
