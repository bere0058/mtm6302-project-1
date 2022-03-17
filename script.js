// Data
const data = {
    currentUser: 'currentUser',
    ideas: [
      {
        username: 'amyrobson',
        content:
          'Non dolor veniam nostrud ad. Commodo ex officia reprehenderit eu laborum. Qui reprehenderit reprehenderit incididunt eiusmod voluptate cupidatat cupidatat dolor. Incididunt sint cupidatat dolore cupidatat ut do dolor nostrud ullamco aliqua aliqua excepteur. Fugiat nostrud esse voluptate magna nostrud nostrud sint et. Irure excepteur irure ullamco occaecat dolor deserunt. Cillum fugiat sunt ullamco ad enim ea eiusmod do et dolor adipisicing mollit aliqua mollit.\r\n',
        score: 3,
      },
      {
        username: 'maxblagun',
        content:
          'Cupidatat veniam quis aliquip ut pariatur excepteur ut. Cupidatat reprehenderit nulla laborum dolore nulla voluptate cupidatat in. Sint tempor non duis sit deserunt culpa sunt labore eu sit consectetur. Excepteur reprehenderit et officia incididunt consectetur laborum consequat laboris excepteur ea adipisicing qui.\r\n',
        score: 10,
      },
      {
        username: 'maxblagun',
        content:
          'Proident qui elit in deserunt velit eu veniam. Tempor velit cillum et dolore. Incididunt anim Lorem Lorem dolor voluptate deserunt cillum consequat ut. Ea fugiat culpa ex et pariatur dolor est officia ea dolore ullamco mollit. Cillum minim consequat ipsum deserunt velit mollit ad consectetur irure dolore proident qui.\r\n',
        score: 6,
      },
      {
        username: 'maxblagun',
        content:
          'Officia exercitation cupidatat enim sint ea quis reprehenderit ipsum. Commodo ullamco deserunt reprehenderit qui in anim aliqua officia do in reprehenderit Lorem. Ipsum non aute officia est nisi sunt non. Proident in eiusmod sint aliquip qui officia deserunt eiusmod sit. Mollit voluptate anim cillum cupidatat duis est ad excepteur consequat fugiat cillum velit esse. Quis dolore sit ullamco qui.\r\n',
        score: 8,
      },
      {
        username: 'currentUser',
        content:
          'Incididunt ut ut velit dolor irure Lorem ex nostrud et laborum commodo dolore laborum culpa. Adipisicing ullamco eu id sit velit ut laboris irure esse quis. Mollit minim laborum do exercitation sint magna ea ea eu eu laboris aliquip anim culpa. Consectetur eiusmod esse ipsum incididunt duis ea nisi qui duis pariatur.\r\n',
        score: 3,
      },
      {
        username: 'currentUser',
        content:
          'Id aute eu quis tempor laborum duis nostrud proident nostrud culpa est ad. Do dolor cillum ullamco excepteur eiusmod laboris dolore do Lorem. Exercitation eiusmod laborum enim culpa esse.\r\n',
        score: 1,
      },
      {
        username: 'amyrobson',
        content:
          'In magna cupidatat ipsum exercitation incididunt non eu amet occaecat et sint irure consequat. Sunt labore incididunt ut culpa aliquip excepteur est. Enim Lorem dolor adipisicing veniam proident quis ad laborum in commodo qui. Proident elit ullamco aliqua non excepteur in fugiat consequat adipisicing ut eu id sunt laboris.\r\n',
        score: 7,
      },
    ],
  }

// Displaying data
const main = document.getElementById('ideas');
let iData = data.ideas;
let editing = false;
let index;

const idea = () => {
  //Display ideas
  let i = 0;
  iData.sort((a, b) => b.score - a.score).map((idea) => {
    const userIdea = () => {
      if (idea.username == 'currentUser') {
        return `
          <div class="d-flex ms-auto">
            <button class="fa-solid fa-pen bg-transparent text-white border-0 my-auto edit"></button>
            <button class="fa-solid fa-trash bg-transparent text-white border-0 my-auto delete"></button>           
          </div>
        `
      }
      else {
        return ''
      }
    }
    const userTag = () => {
      if (idea.username == 'currentUser') {
        return `
          <div class="px-2 mx-2 my-auto bg-primary rounded">you</div>
        `
      } else {
        return ''
      }
    }
    const ideaContent = () => {
      if (editing && index==i) {
        return `
          <textarea type='text' class="idea-content w-100">${idea.content}</textarea>
          <div class="d-flex w-100 justify-content-end">
            <button class="cancel fa-solid fa-xmark bg-transparent text-white border-0 m-0"></button>
            <p class="button cancel my-auto">cancel</p>
          </div>
        `
      }
      else {
        return `
          <p class="idea-content">${idea.content}</p>
        `
      }
    }
    main.innerHTML += `
    <article class="p-2 my-5" id=${i}>
        <section class="d-flex">
          <div class="py-2 username">By: ${idea.username}</div>        
          ${userTag()}
        </section>
        ${ideaContent()}
        <section class="d-flex score">
          <button class="p-2 my-auto fa-solid fa-arrow-up bg-transparent text-white border-0 upvote"></button>
          <p class="p-2 m-0">${idea.score}</p>
          <button class="p-2 my-auto fa-solid fa-arrow-down bg-transparent text-white border-0 downvote"></button>
          ${userIdea()}
        </section>
      </article>
    `
    i++;
  });

  // Upvote and Downvote
  const btnUp = main.querySelectorAll('.upvote');
  const btnDown = main.querySelectorAll('.downvote');
  const reset = () => {
    main.innerHTML = null
    idea();
  }
  const btnUpdate = (e) => {
    if (e.target.classList.contains('upvote')) {
      iData[e.target.parentElement.parentElement.id].score++
    }
    else {
      iData[e.target.parentElement.parentElement.id].score--
    }
    reset()
  };
  btnUp.forEach(btn => {
    btn.addEventListener('click', (e) => {btnUpdate(e)})
  });
  btnDown.forEach(btn => {
    btn.addEventListener('click', (e) => {btnUpdate(e)})
  });
  
  //Edit and remove user idea
  const edit = main.querySelectorAll('.edit');
  const remove = main.querySelectorAll('.delete');
  const cancel = main.querySelectorAll('.cancel');
  cancel.forEach(cancel => {
  cancel.addEventListener('click', (e) =>{
    editing = false
    reset()
    })
  });
  edit.forEach(edit => {
  edit.addEventListener('click', (e) =>{
    if (editing) {
      editing = false
      const textArea = main.querySelector('textarea');
      iData[index].content = textArea.value
    } else {
      index = e.target.parentElement.parentElement.parentElement.id;
      editing = true;
    }
    reset()
    })
  });
  remove.forEach(remove => {
  remove.addEventListener('click', (e) =>{
    delete iData[e.target.parentElement.parentElement.parentElement.id]
    reset()
    })
  });
}
idea()

// User Ideas
const userIdea = document.getElementById('user-idea');
const btnUser = userIdea.querySelector('button');
const textArea = userIdea.querySelector('textarea');
const comment = userIdea.querySelector('p');

// Submit new idea
const submit = (e) => {
  e.preventDefault();
  if (textArea.value !== '') {
    iData.push(
      {
        username: 'currentUser',
        content: textArea.value,
        score: 0
      }
      );
      idea()
      alert('New comments will be at the bottom because they start with a score of 0')
  } else {
    alert('Write something first!')
  }
}
btnUser.addEventListener('click', (e) => {
  submit(e)
})
comment.addEventListener('click', (e) => {
  submit(e)
})


